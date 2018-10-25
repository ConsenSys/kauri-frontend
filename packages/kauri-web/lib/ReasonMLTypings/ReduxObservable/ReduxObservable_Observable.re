type observable('a);

[@bs.module "rxjs"] external makeObservable: 'a = "Observable";

[@bs.send] external _of1: ('a, 'b) => observable('b) = "of";
[@bs.send] external _of2: ('a, 'b, 'c) => observable('d) = "of";
[@bs.send] external _of3: ('a, 'b, 'c, 'd) => observable('e) = "of";

let of1 = a => _of1(makeObservable, a);
let of2 = (a, b) => _of2(makeObservable, a, b);
let of3 = (a, b, c) => _of3(makeObservable, a, b, c);

[@bs.send] external ofType: ('a, string) => 'a = "";

[@bs.send]
external _fromPromise: ('a, Js.Promise.t('b)) => observable('b) =
  "fromPromise";

let fromPromise = a => _fromPromise(makeObservable, a);

[@bs.send] external flatMapTo: ('a, observable('b)) => observable('b) = "";
[@bs.send] external mapTo: ('a, 'b) => observable('b) = "";

[@bs.send] external filter: ('a, 'b => bool) => 'b = "";

[@bs.send]
external flatMap: (observable('a), 'a => observable('b)) => observable('b) =
  "mergeMap";

[@bs.send]
external mergeMap: (observable('a), 'a => observable('b)) => observable('b) =
  "";

[@bs.send]
external switchMap: ('a, 'a => observable('b)) => observable('b) = "";

[@bs.send] external tap: (observable('a), 'a => 'b) => observable('a) = "do";

[@bs.send] external map: (observable('a), 'a => 'b) => observable('b) = "";

[@bs.send]
external catch: (observable('a), exn => observable('b)) => observable('b) =
  "";

/* [@bs.send] external mergeMap : ('t, 't => 'b) => t('b) = ""; */
/* let hello = a => */
/* a |. ofType |. flatMap(x => x / 2) |. flatMap(y => y + a) |. mergeMap(x => x); */
/* let what =
   fromPromise(Js.Promise.resolve([1, 2]))
   |. filter(x => x === "hey")
   |. flatMap(x => of1(String.uppercase(x)))
   |. mergeMap(x => fromPromise(Js.Promise.resolve(x ++ "HEY")))
   |. flatMap(x => of1(int_of_string(x))); */

/* Redux deps */