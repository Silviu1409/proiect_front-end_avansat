import {app} from "../dbconfig";
import {getFirestore, collection, getDocs, DocumentData} from "firebase/firestore";


const db = getFirestore(app);

const testCollection = collection(db, "placi_baza");


export async function getMBDs(){
    var mbds: DocumentData[] = [];

    const snapshot = await getDocs(testCollection);
    snapshot.forEach((doc) => {
        mbds.push(doc.data());
    });

    return mbds;
}