import {app} from "../dbconfig";
import {getFirestore, collection, getDocs, DocumentData} from "firebase/firestore";


const db = getFirestore(app);

const testCollection = collection(db, "cpu");


export async function getCPUs(){
    var cpus: DocumentData[] = [];

    const snapshot = await getDocs(testCollection);
    snapshot.forEach((doc) => {
        cpus.push(doc.data());
    });

    return cpus;
}