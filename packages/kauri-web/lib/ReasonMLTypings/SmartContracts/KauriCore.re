type deployedContract;

[@bs.deriving abstract]
type fromAccount = {from: string};

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
    deployedContract,
    string,
    int,
    string,
    string,
    string,
    string,
    string,
    string,
    string,
    fromAccount
  ) =>
  Js.Promise.t(string) =
  "publishArticle";

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
    ) => {
  let fromAccount = fromAccount(~from=account);
  _publishArticle(
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
    fromAccount,
  );
};