import {app} from "../dbconfig";
import {getFirestore, collection, getDocs} from "firebase/firestore";

const db = getFirestore(app);

const testCollection = collection(db, "gpu");

export async function getGPUs(){
    const snapshot = await getDocs(testCollection);
    snapshot.forEach((doc) => {
        console.log(doc.get);
    });
}