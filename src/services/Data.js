
function convertToOriginalFormat(entry) {
    const result = {};

    for (const [key, value] of Object.entries(entry)) {
        const parts = key.split('__');
        if (parts.length === 1) {
            // Direct assignment for top-level keys
            result[key] = parseValue(value);
        } else {
            // Nested structure
            let current = result;
            parts.forEach((part, index) => {
                if (index === parts.length - 1) {
                    current[part] = parseValue(value);
                } else {
                    if (!current[part] || typeof current[part] !== 'object') {
                        current[part] = {};
                    }
                    current = current[part];
                }
            });
        }
    }

    // Directly parse numbers without converting '0' or '1' into boolean
    function parseValue(value) {
        // Check if the value is a number or a string representation of a number
        const num = Number(value);
        if (!isNaN(num)) {
            return num;
        }
        return value;
    }

    return result;
}

function convertToSupabaseFormat(obj, parentKey = '') {
    let result = {};

    for (const [key, value] of Object.entries(obj)) {
        let newKey = parentKey ? `${parentKey}__${key}` : key;

        if (value !== null && typeof value === 'object' && !Array.isArray(value) && !(value instanceof Date)) {
            // If the value is a nested object, recurse
            Object.assign(result, convertToSupabaseFormat(value, newKey));
        } else {
            // Direct assignment for non-object values or arrays
            result[newKey] = value;
        }
    }

    return result;
}

const save_email = async (email)=>{
    const result = await fetch('https://lcfqqdzcckgefoludhyl.supabase.co/functions/v1/lti_backend/save_email',
    {
        method: 'POST',
        body: JSON.stringify({email}),
        headers:{
            Authorization : 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxjZnFxZHpjY2tnZWZvbHVkaHlsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTE0OTcwMTQsImV4cCI6MjAyNzA3MzAxNH0.I2YAtEmPVf274cqyOD2U1JgjkGMLnrUYCL9AYei5XS0'
        }
    });

    const body = await result.json();
    const status = result.status

    return {body, status};
}

const get_email_list = async ()=>{
    const result = await fetch('https://lcfqqdzcckgefoludhyl.supabase.co/functions/v1/lti_backend/get_emails',
    {
        headers:{
            Authorization : 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxjZnFxZHpjY2tnZWZvbHVkaHlsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTE0OTcwMTQsImV4cCI6MjAyNzA3MzAxNH0.I2YAtEmPVf274cqyOD2U1JgjkGMLnrUYCL9AYei5XS0'
        }
    });

    const body = await result.json();

    return body.emails
}

const fetchData = async ()=>{
        const result = await fetch('https://lcfqqdzcckgefoludhyl.supabase.co/functions/v1/lti_backend/fetch_data',
        {
            headers:{
                Authorization : 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxjZnFxZHpjY2tnZWZvbHVkaHlsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTE0OTcwMTQsImV4cCI6MjAyNzA3MzAxNH0.I2YAtEmPVf274cqyOD2U1JgjkGMLnrUYCL9AYei5XS0'
            }
        });

        const body = await result.json();

        const formattedData = body.data.map((element)=>convertToOriginalFormat(element))

        const alteredData = formattedData.map((object)=>{
            return {...object, cost: object.cost.discountedPrice, 
                    shipping: {
                        shippingUsa: object.cost.shippingUsa, shippingIntl: object.cost.shippingIntl
                    },
                    yearReleased: Number(object.yearReleased),
                    value: {discountedPerLed: Number(object.cost.discountedPrice/object.leds.leds).toFixed(1), discountedPerOutput: Number(object.cost.discountedPrice/object.leds.totalPowerOutput).toFixed(1)},
                    info: {...object.info, warehouse: object.info.warehouse !== "" && object.info.warehouse !== undefined ? object.info.warehouse.replaceAll('\\n','\n').split("\n") : []}
                }
        })

        console.log(JSON.stringify(alteredData[0]))

        return alteredData;

    }

const insertProduct = async (product) => {
    const result = await fetch('https://lcfqqdzcckgefoludhyl.supabase.co/functions/v1/lti_backend/insert_record',
    {
        method: 'POST',
        body: JSON.stringify(convertToSupabaseFormat(product)),
        headers:{
            Authorization : 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxjZnFxZHpjY2tnZWZvbHVkaHlsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTE0OTcwMTQsImV4cCI6MjAyNzA3MzAxNH0.I2YAtEmPVf274cqyOD2U1JgjkGMLnrUYCL9AYei5XS0'
        }
    });

    const body = await result.json();
    const status = result.status

    return {body, status};
    }

const updateRecord = async (product, _id) => {

    console.log(product)
        const result = await fetch('https://lcfqqdzcckgefoludhyl.supabase.co/functions/v1/lti_backend/update_record?recordId='+_id,
        {
            method: 'PUT',
            body: JSON.stringify(convertToSupabaseFormat(product)),
            headers:{
                Authorization : 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxjZnFxZHpjY2tnZWZvbHVkaHlsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTE0OTcwMTQsImV4cCI6MjAyNzA3MzAxNH0.I2YAtEmPVf274cqyOD2U1JgjkGMLnrUYCL9AYei5XS0'
            }
        });

        const body = await result.json();
        const status = result.status

        return {body, status};
    }

const deleteRecord = async (_id) => {
    const result = await fetch('https://lcfqqdzcckgefoludhyl.supabase.co/functions/v1/lti_backend/delete_record?recordId='+_id,
    {
        method: 'DELETE',
        headers:{
            Authorization : 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxjZnFxZHpjY2tnZWZvbHVkaHlsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTE0OTcwMTQsImV4cCI6MjAyNzA3MzAxNH0.I2YAtEmPVf274cqyOD2U1JgjkGMLnrUYCL9AYei5XS0'
        }
    });

    const body = await result.json();
    const status = result.status

    return {body, status};
    }
    



        export {fetchData, insertProduct, updateRecord, deleteRecord, save_email, get_email_list}