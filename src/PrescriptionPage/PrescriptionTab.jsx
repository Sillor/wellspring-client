
export default function PrescriptionTab(props){
    return (
        <>
            <table className='table justify-between w-full'>
                <tbody>
                    <tr className='table-row w-full h-10'>
                        <td htmlFor="generalInfo" className="table-cell w-1/2 font-bold">Medical Name:</td>
                        <td htmlFor="generalInfo" className="table-cell w-1/3 font-bold">Dose:</td>
                        <td htmlFor="generalInfo" className="table-cell w-1/3 font-bold">Ordered:</td>
                    </tr>
                    <tr className='table-row'>
                        <td htmlFor="generalInfo" className="table-cell w-auto">{props.prescription.PrescriptionName}</td>
                        <td className='table-cell w-1/3'>{props.prescription.Dosage}</td>
                        <td className='table-cell w-1/3'>{props.prescription.OrderDate}</td>
                    </tr>
                </tbody>
            </table>
        </>
    )
}