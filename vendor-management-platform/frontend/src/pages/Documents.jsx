

import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import {
getVendorDocuments,
uploadDocument
} from "../services/documentService";

function Documents() {

const vendorId = localStorage.getItem("vendorId");

const [documents, setDocuments] = useState([]);

const [file, setFile] = useState(null);

const [documentType, setDocumentType] = useState("PAN_CARD");

useEffect(() => {

    fetchDocuments();

}, []);

const fetchDocuments = async () => {

    try {

        const data = await getVendorDocuments(vendorId);

        setDocuments(data);

    } catch (error) {

        console.error(error);

    }
};

const handleUpload = async (e) => {

    e.preventDefault();

    try {

        await uploadDocument(
            file,
            documentType,
            vendorId
        );

        alert("Document Uploaded Successfully");

        fetchDocuments();

    } catch (error) {

        console.error(error);

    }
};

return (

    <div>

        <Navbar />

        <div
            style={{
                maxWidth: "900px",
                margin: "30px auto",
                padding: "20px"
            }}
        >

            <h2>My Documents</h2>

            <form
                onSubmit={handleUpload}
                style={{
                    marginBottom: "30px"
                }}
            >

                <select
                    value={documentType}
                    onChange={(e) =>
                        setDocumentType(e.target.value)
                    }
                    style={{
                        padding: "10px",
                        marginRight: "10px"
                    }}
                >

                    <option value="PAN_CARD">
                        PAN Card
                    </option>

                    <option value="GST_CERTIFICATE">
                        GST Certificate
                    </option>

                    <option value="COMPANY_REGISTRATION">
                        Company Registration
                    </option>

                </select>

                <input
                    type="file"
                    onChange={(e) =>
                        setFile(e.target.files[0])
                    }
                />

                <button
                    type="submit"
                    style={{
                        marginLeft: "10px",
                        padding: "10px 20px"
                    }}
                >
                    Upload
                </button>

            </form>

            <table
                style={{
                    width: "100%",
                    borderCollapse: "collapse"
                }}
            >

                <thead>

                    <tr>

                        <th
                            style={{
                                border: "1px solid #ddd",
                                padding: "10px"
                            }}
                        >
                            Document Type
                        </th>

                        <th
                            style={{
                                border: "1px solid #ddd",
                                padding: "10px"
                            }}
                        >
                            File Name
                        </th>

                        <th
                            style={{
                                border: "1px solid #ddd",
                                padding: "10px"
                            }}
                        >
                            Status
                        </th>

                    </tr>

                </thead>

                <tbody>

                    {documents.map((doc) => (

                        <tr key={doc.id}>

                            <td
                                style={{
                                    border: "1px solid #ddd",
                                    padding: "10px"
                                }}
                            >
                                {doc.documentType}
                            </td>

                            <td
                                style={{
                                    border: "1px solid #ddd",
                                    padding: "10px"
                                }}
                            >
                                {doc.fileName}
                            </td>

                            <td
                                style={{
                                    border: "1px solid #ddd",
                                    padding: "10px"
                                }}
                            >
                                {doc.status}
                            </td>

                        </tr>

                    ))}

                </tbody>

            </table>

        </div>

    </div>

);

}

export default Documents;
