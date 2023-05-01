
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



        export {fetchData, insertProduct}