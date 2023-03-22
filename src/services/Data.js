
    const fetchData = async ()=>{
        const result = await fetch('https://ledlist.sidbarrack.workers.dev/fetchData');

        const body = await result.json();

        return body.data;

        }



        export {fetchData}