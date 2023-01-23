import {app} from "../dbconfig";
import {getFirestore, collection, getDocs, DocumentData} from "firebase/firestore";


const db = getFirestore(app);

const testCollection = collection(db, "ssd");


export async function getSSDs(){
    var ssds: DocumentData[] = [];

    const snapshot = await getDocs(testCollection);
    snapshot.forEach((doc) => {
        ssds.push(doc.data());
    });

    return ssds;
}