//Constantes de la api y el .json
const BASE_URL = "https://japceibal.github.io/emercado-api/";
const EXT_TYPE = ".json";

//Spinner de carga
const showSpinner = () => {
  document.getElementById("spinner-wrapper").style.display = "block";
};

//Spinner de carga oculto
const hideSpinner = () => {
  document.getElementById("spinner-wrapper").style.display = "none";
};

//Obtener los productos y categorias del json
const getJSONData = async (url) => {
  const result = { status: "ok", data: null };
  

  //Se hace un fetch que hace un pedido de informacion
  try {
    const response = await fetch(url);

    //Revisar si se encontro o no
    if (!response.ok) {
      throw new Error(response.statusText);
    }

    //Se fija si lo anterior se encontró y si no actualiza los productos (muestra todos)
    result.data = await response.json();
  } catch (error) {
    result.status = "error";
    result.data = error;
  }

  return result;
};

//Traer las categorias del json
const CATEGORIES_URL = `${BASE_URL}cats/cat${EXT_TYPE}`;
getJSONData(CATEGORIES_URL)
  .then((categoriesData) => {
    console.log(categoriesData);
  })
  .catch((error) => {
    console.error("Error al obtener datos de categorías:", error);
  });

//Traer los productos del json
const PUBLISH_PRODUCT_URL = `${BASE_URL}sell/publish${EXT_TYPE}`;
getJSONData(PUBLISH_PRODUCT_URL)
  .then((publishProductData) => {
    console.log(publishProductData);
  })
  .catch((error) => {
    console.error("Error al obtener datos de publicación de productos:", error);
  });


  /*
  esta función permite hacer un array en base a otro array de forma dinámica.
  La gracia es que nos deja poner un máximo de items en el nuevo array
  Si el array del que extraemos está vacío retorna 0, de lo contrario sólo empuja elementos al nuevo array
  */
  function agregarAlArraySiExiste(sourceArray, newArray, maxelements){
    if (sourceArray.length>0){
      for(let i=0; i<maxelements && i<sourceArray.length; i++){
        newArray.push(sourceArray[i]);
      }}
  }
