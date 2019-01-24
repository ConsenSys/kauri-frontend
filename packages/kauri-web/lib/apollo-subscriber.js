import apolloClient from "./init-apollo";
import { getEvent } from "../queries/Module";

export default (hash, filterName) => {
  let count = 0;
  return new Promise((resolve, reject) =>
    filterName
      ? apolloClient()
        .subscribe({
          query: getEvent,
          variables: { hash: `${hash}-${filterName}` },
        })
        .subscribe({
          next: data => {
            if (!count) {
              count = count + 1;
            }
            resolve(data);
          },
          error: err => reject(err),
        })
      : apolloClient()
        .subscribe({
          query: getEvent,
          variables: { hash },
        })
        .subscribe({
          next: data => resolve(data),
          error: err => reject(err),
        })
  );
};
