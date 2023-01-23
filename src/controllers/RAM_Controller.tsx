import {app} from "../dbconfig";
import {getFirestore, collection, getDocs} from "firebase/firestore";

const db = getFirestore(app);

const testCollection = collection(db, "ram");

export async function getRAMs(){
    const snapshot = await getDocs(testCollection);
    snapshot.forEach((doc) => {
        console.log(doc.get);
    });
}