import { collection, addDoc, getFirestore } from "firebase/firestore";


export default function handler(req, res) {

  const[
    tierListName,
    variantsInfo,
  ]= Objects.values(req.body);

  const variants = new Array();

  variantsInfo.forEach((item) => {
    variants.push(JSON.parse(item));
  });

    // const db = getFirestore();

    // console.log(req.body.name);
    // console.log(req.body.info);
    // console.log(req.body.desc);

    // const docRef = addDoc(collection(db, "testLists"), {
    //     name: req.body.name,
    //     info: req.body.info,
    //     desc: req.body.desc, 
    //   });

    res.status(200).json({ msg: 'Success' })
}