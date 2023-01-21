import {app} from "../dbconfig";
import {getFirestore, collection, getDocs} from "firebase/firestore";

const db = getFirestore(app);

const testCollection = collection(db, "test");

export async function test(){
    const snapshot = await getDocs(testCollection);
    snapshot.forEach((doc) => {
        console.log(doc.get("test"));
    });
}