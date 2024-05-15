
export default function PrescriptionTab(props){
    console.log(props)
    return (
        <div className="border-black-900">
            <table className='table justify-between w-full border-separate'>
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
                    <tr className='table-row w-full h-10'>
                        <td htmlFor="generalInfo" className="table-cell w-1/2 font-bold">Order By:</td>

                    </tr>
                    <tr className='table-row border-t-1 border-black'>
                        <td htmlFor="generalInfo" className="table-cell w-auto">{props.prescription.OrderedBy}</td>
                    </tr>
                    <tr className="h-10">
                        <td></td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}