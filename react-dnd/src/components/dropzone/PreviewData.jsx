import React, {useCallback, useEffect, useState} from "react";
import {importExcelFile} from "../../app/utils";
import {TargetBox} from "./TargetBox";
import styles from "./styles.module.css";

function ErrorMessage({message, onClose}) {
    useEffect(() => {
        const timer = setTimeout(onClose, 3000);
        return () => clearTimeout(timer);
    }, []);
    return <p className={styles.error}>{message}</p>
}

export function PreviewData({children, onData}) {
    const [state, setState] = useState({
        uploaded: false,
        error: null
    });
    const onDrop = (drop) => {
        importExcelFile(drop.files[0]).then(data => {
            setState({uploaded: true, error: null});
            onData(data, drop.files[0].name);
        }).catch(err => {
            setState({uploaded: false, error: err});
        });
    };

    return state.uploaded ? children : <div className={styles.preview}>
        <TargetBox onDrop={onDrop}/>
        {state.error ? <ErrorMessage
            message={state.error.message}
            onClose={() => setState({ ...state, error: null })}
        /> : null}
    </div>
}