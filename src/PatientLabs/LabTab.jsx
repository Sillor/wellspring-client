

export default function LabTab(props){
    console.log(props)
    let dateFormat = props.lab.OrderDate.replace("T00:00:00.000Z", "")

    return(
        <>
            <table className='table justify-between w-full border-separate' id='table'>
                <tbody>
                    <tr className='table-row w-full h-10 border-spacing-y-3'>
                        <td htmlFor="generalInfo" className="table-cell w-1/2 font-bold">Procedure Name:</td>
                        <td htmlFor="generalInfo" className="table-cell w-1/3 font-bold">Ordered By:</td>
                        <td htmlFor="generalInfo" className="table-cell w-1/3 font-bold">Date:</td>
                    </tr>

                    <tr className='table-row h-4'>
                        <td htmlFor="generalInfo" className="table-cell w-auto">{props.lab.Lab}</td>
                        <td className='table-cell w-1/3'>Dr. self</td>
                        <td className='table-cell w-1/3'>{dateFormat}</td>
                    </tr>
                    <tr className='table-row h-4'>
                        <td className='table-cell w-1/3'>Results & Notes:</td>
                        <td className='table-cell w-1/3'>{props.lab.Results}</td>
                    </tr>
                </tbody>
            </table>
        </>
    )
}