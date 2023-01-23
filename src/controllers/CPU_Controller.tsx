import {app} from "../dbconfig";
import {getFirestore, collection, getDocs} from "firebase/firestore";

const db = getFirestore(app);

const testCollection = collection(db, "cpu");

export async function getCPUs(){
    const snapshot = await getDocs(testCollection);
    snapshot.forEach((doc) => {
        console.log(doc.get);
    });
}