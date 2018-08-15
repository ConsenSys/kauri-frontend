let (|?) = (a, b) =>
  switch (a) {
  | None => None
  | Some(a) => b(a)
  };

let default = (a, b) =>
  switch (b) {
  | Some(b) => b
  | None => a
  };