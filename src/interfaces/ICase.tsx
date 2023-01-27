export type ICase = {
    id: string,
    denumire: string,
    dimensiuni: string,
    placi_compat: {
        ATX: boolean,
        mATX: boolean,
        mITX: boolean
    },
    ventilatoare_incl: string,
    pret: number,
    url_poza: string
}