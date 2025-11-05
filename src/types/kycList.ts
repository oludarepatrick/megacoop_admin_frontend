export type KYCList = {
    kyc_uuid: string
    user_uuid: string
    first_name: string
    middle_name: string
    last_name: string
    email: string
    phone: string
    nin: string
    nin_status: string
    nin_details: NINDetails
    bvn: string
    bvn_status: string
    bvn_details: { firstname: boolean,  lastname: boolean}
    valid_id_card: string
    valid_id_card_path: string
    contact_address: string
    proof_of_address: string
    live_face_verification: string
    admin_approval_status: string
}
type NINDetails = {
        nin: number
        firstname: string
        lastname: string
        middlename: string
        phone: string
        gender: string
        photo: string
        birthdate: string
        residence: {address1: string }
}

export type KYCListResponse = {
    success: boolean
    data: KYCList[]
    message: string
}

export type KYCStatus = "pending" | "approved" | "declined";