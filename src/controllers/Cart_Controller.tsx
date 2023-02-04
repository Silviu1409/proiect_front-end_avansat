import {app} from "../dbconfig";
import {getFirestore, collection, getDocs, addDoc, DocumentData} from "firebase/firestore";


const db = getFirestore(app);

const cartCollection = collection(db, "comenzi");


export async function place_order(data: any){
    await addDoc(cartCollection, data);
}

export async function get_orders(user: string){
    let orders: DocumentData[] = [];

    const snapshot = await getDocs(cartCollection);
    snapshot.forEach((doc) => {
        if(doc.data().user === user){
            const aux = {
                cantitate: doc.data().cantitate,
                pret: doc.data().pret,
                produse: doc.data().produse,
                total: doc.data().total,
                data: doc.data().data,
                id: doc.id,
            }

            orders.push(aux);
        }
    });

    return orders;
}