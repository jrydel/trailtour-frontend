import React from "react";
import TableComponent from "../../components/TableComponent";
import { useFetch } from "../../core/FetchApi";
import { API_URL } from "../../AppContext";
import { useSnackbar } from "notistack";
import LayoutPage from "../LayoutPage";

const AthletesPage = () => {

    const { enqueueSnackbar } = useSnackbar();
    const showSnackbar = (message, variant) => enqueueSnackbar(message, { variant: variant });

    const [tableData, trigger] = useFetch(
        "http://127.0.0.1:8080/getAthletes",
        [],
        error => showSnackbar("Nepodařilo se načíst data z API.", "error")
    );

    console.log(tableData);


    const tableHeader = [
        {
            name: "id",
            label: "Id",
            options: {
                sort: true
            }
        },
        {
            name: "clubId",
            label: "Klub",
            options: {
                sort: true
            }
        },
        {
            name: "name",
            label: "Jméno",
            options: {
                sort: true
            }
        },
        {
            name: "gender",
            label: "Pohlaví",
            options: {
                sort: true
            }
        },
    ];

    return (
        <LayoutPage pageTitle={"Závodníci"} pageContent={
            <TableComponent tableHeader={tableHeader} tableData={tableData.data} />
        } />
    );
}

export default AthletesPage;