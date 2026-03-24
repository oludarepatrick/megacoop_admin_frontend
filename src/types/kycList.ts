export type KYCList = {
    kyc_uuid: string
    user_uuid: string
    user_type: string
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
    bvn_details: { firstName: string,  
        lastName: string, 
        dateOfBirth: string, 
        allValidationPassed: boolean, 
        photo: string
    }
    valid_id_card: string
    valid_id_card_path: string
    contact_address: string
    proof_of_address: string
    live_face_verification: string
    admin_approval_status: string
}
type NINDetails = {
        idNumber: number
        firstName: string
        lastName: string
        middleName: string
        phone: string
        gender: string
        photo: string
        // birthdate: string
        address: {addressLine: string }
}

export type KYCListResponse = {
    success: boolean
    data: KYCList[]
    message: string
}

export type KYCStatus = "pending" | "approved" | "declined";