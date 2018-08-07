type publishArticle;
[@bs.deriving abstract]
type deployedContract = {publishArticle};

[@bs.deriving abstract]
type transactionOptions = {
  from: string,
  gas: int,
  gasPrice: int,
};

/*
 articleId,
 articleVersion,
 (requestId != null) ? requestId : "",
 this.utils.convertIpfsHash(contentHash),
 category,
 "0x"+account,
 sig.v,
 "0x"+sig.r.toString("hex"),
 "0x"+sig.s.toString("hex"),
 { from: account }
 */
[@bs.send]
external _publishArticle :
  (
    publishArticle,
    string,
    int,
    string,
    string,
    string,
    string,
    string,
    string,
    string,
    transactionOptions
  ) =>
  Js.Promise.t(string) =
  "sendTransaction";

let publishArticle =
    (
      deployedContract,
      articleID,
      articleVersion,
      requestID,
      convertedIPFSHash,
      category,
      contributor,
      signatureV,
      signatureR,
      signatureS,
      account,
      gasPrice,
    ) => {
  let transactionOptions =
    transactionOptions(~from=account, ~gas=250000, ~gasPrice);

  /* [%debugger]; */
  _publishArticle(
    deployedContract |. publishArticleGet,
    articleID,
    articleVersion,
    requestID,
    convertedIPFSHash,
    category,
    contributor,
    signatureV,
    signatureR,
    signatureS,
    transactionOptions,
  );
};