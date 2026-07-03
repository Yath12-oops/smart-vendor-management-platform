
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import {getAllDocuments, verifyDocument,rejectDocument, viewDocument} from "../services/documentService";

function AdminDocuments() {

    const [documents, setDocuments] = useState([]);

    useEffect(() => {
        loadDocuments();
    }, []);

   const loadDocuments = async () => {

    const data = await getAllDocuments();

    setDocuments(data);

};
    return (
        <div>

            <Navbar />

            <div style={{ padding: "40px" }}>

                <h1 style={{ textAlign: "center" }}>
                    Document Management
                </h1>

                <table
                    border="1"
                    cellPadding="12"
                    style={{
                        width: "100%",
                        marginTop: "30px",
                        textAlign: "center"
                    }}
                >

                    <thead>

                        <tr>

                            <th>Vendor</th>
                            <th>Document</th>
                            <th>Status</th>
                            <th>Actions</th>

                        </tr>

                    </thead>

                    <tbody>

                        {documents.map((doc) => (

                            <tr key={doc.id}>

                              <td>{doc.vendorName}</td>

                                <td>{doc.documentType}</td>

                                <td>{doc.status}</td>

                                <td>

                                    <button onClick={()=> viewDocument(doc.id)}>
                                        View
                                    </button>

                                    {" "}

                                    <button

onClick={async ()=>{

    await verifyDocument(doc.id);

    loadDocuments();

}}

>

Verify

</button>

                                    {" "}

                                    <button

onClick={async ()=>{

    await rejectDocument(doc.id);

    loadDocuments();

}}

>

Reject

</button>

                                </td>

                            </tr>

                        ))}

                    </tbody>

                </table>

            </div>

        </div>
    );
}

export default AdminDocuments;