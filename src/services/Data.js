
    const fetchData = async ()=>{
        const result = await fetch('https://ledlist.sidbarrack.workers.dev/fetchData');

        const body = await result.json();

        return body.data;

        }
    const insertProduct = async (product) => {
        const result = await fetch('https://ledlist.sidbarrack.workers.dev/insertRecord', {
            method: 'POST',
            body: JSON.stringify(product)
        })

        const body = await result.json();
        const status = result.status

        return {body, status};
    }
    const updateRecord = async (product, _id) => {
        const result = await fetch('https://ledlist.sidbarrack.workers.dev/updateRecord?recordId='+_id, {
            method: 'POST',
            body: JSON.stringify(product)
        })

        const body = await result.json();
        const status = result.status

        return {body, status};
    }

    const deleteRecord = async (_id) => {
        const result = await fetch('https://ledlist.sidbarrack.workers.dev/deleteRecord?recordId='+_id, {
            method: 'POST'
        })

        const body = await result.json();
        const status = result.status

        return {body, status};
    }
    



        export {fetchData, insertProduct, updateRecord, deleteRecord}