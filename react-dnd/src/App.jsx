import "./App.css";
import React, {useState} from "react";
import {PreviewData} from "./components/dropzone/PreviewData";
import {Table} from "./components/table/Table";
import {exportExcelFile, exportJsonFile} from "./app/utils";
import {Input} from "./components/form/Input";

function App() {
    const [data, setData] = useState([]);
    const [file, setFile] = useState("");
    const onData = (data, fileName) => {
        setData(data);
        setFile(fileName.split(".").slice(0, -1));
    };
    const onChange = (row, key, value) => {
        const nextData = data.map((item, index) => (row === index) ? {
            ...item,
            [key]: value
        } : item);
        setData(nextData);
    };
    const onExport = (type) => {
        switch (type) {
            case "xlsx": return exportExcelFile(data, `${file}.xlsx`);
            case "json": return exportJsonFile(data, `${file}.json`);
            default: return;
        }
    };

    return <div className="wrapper">
        <PreviewData onData={onData}>
            <input type="text" value={file} onChange={e => setFile(e.target.value)} />
            <Table data={data}>
                {({ value, index, key, className }) => <Input
                    value={value}
                    onChange={value => onChange(index, key, value)}
                    className={className}
                />}
            </Table>
            <div className="buttons">
                <button onClick={() => onExport('xlsx')}>Export as XLSX</button>
                <button onClick={() => onExport('json')}>Export as JSON</button>
            </div>
        </PreviewData>
    </div>
}

export default App;
