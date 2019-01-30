import "../lib/rxjs-used-operators";
import { Observable } from "rxjs/Observable";
import fs from "fs";
import path from "path";
import { Storage, UploadResponse } from "@google-cloud/storage";

const projectId = "kauri-197812";
const bucketName = "kauri-static-assets-for-cdn";
const storage = new Storage({
  projectId,
});
const bucket = storage.bucket(bucketName);

const buildFolderDir = path.resolve(__dirname, "../build");
const buildFolderFileNames = fs.readdirSync(buildFolderDir);

console.info(`/// Uploading build folder dir at ${buildFolderDir}`);

const handleError = error => console.error(error);
const handleResult = (result: UploadResponse[]) => {
  if (Array.isArray(result)) {
    console.info(
      `/// Uploading build artifacts to bucket ${bucketName} successful!`
    );
  }
};

const uploadBuildFilesToGCP = (
  filesInsideBuildFolder: string[]
): Observable<UploadResponse[]> => {
  const uploadFilesPromises = filesInsideBuildFolder.map(fileName =>
    Observable.fromPromise(bucket.upload(`${buildFolderDir}/${fileName}`))
  );
  return Observable.merge(uploadFilesPromises).combineAll();
};

Observable.of(buildFolderFileNames)
  .mergeMap(uploadBuildFilesToGCP)
  .subscribe(handleResult, handleError);
