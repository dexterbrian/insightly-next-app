import Link from "next/link";
import { apiUrl } from "../create/page";

export default function TableRow({ id, creator, title, created, modified }) {

    function deleteQuestionnaire(id) {
        window.confirm("Are you sure?") &&
        fetch(`${apiUrl}/api/questionnaires/${id}`, {
            method: 'DELETE',
        });
        console.log("Deleted: ", id);
    }

    return (
        <>
            <tr className="border-t border-t-[#dbe0e6]">
                <td className="table-0f32c645-969d-4345-a19f-f879078285dd-column-120 h-[72px] px-4 py-2 w-[400px] text-[#111418] dark:text-white text-sm font-normal leading-normal">
                {title}
                </td>
                <td className="table-0f32c645-969d-4345-a19f-f879078285dd-column-240 h-[72px] px-4 py-2 w-60 text-sm font-normal leading-normal">
                <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-8 px-4 bg-[#f0f2f5] text-[#111418] text-sm font-medium leading-normal w-full">
                    <span className="truncate">{creator}</span>
                </button>
                </td>
                <td className="table-0f32c645-969d-4345-a19f-f879078285dd-column-360 h-[72px] px-4 py-2 w-[400px] text-[#60758a] dark:text-white text-sm font-normal leading-normal">
                {created}
                </td>
                <td className="table-0f32c645-969d-4345-a19f-f879078285dd-column-480 h-[72px] px-4 py-2 w-[400px] text-[#60758a] dark:text-white text-sm font-normal leading-normal">
                {modified}
                </td>
                <td className="table-0f32c645-969d-4345-a19f-f879078285dd-column-600 h-[72px] px-4 py-2 w-60 text-[#60758a] dark:text-white text-sm font-bold leading-normal tracking-[0.015em]">
                    <Link className="mr-2" href={`/questionnaires/${id}/submit`}>View</Link>
                    <Link className="mr-2" href={`/questionnaires/${id}/edit`}>Edit</Link>
                    <button onClick={() => deleteQuestionnaire(id)} className="cursor-pointer text-red-500">Delete</button>
                </td>
            </tr>
        </>
    )
}