function $(element) {
  return document.querySelector(element);
}


window.addEventListener("load", () => {
  

const Categorias = document.getElementById("ver-categorias");
const Balance = document.getElementById("ver-balance");
const Reporte = document.getElementById("ver-reportes");

const secCategorias = document.getElementById("sec-categorias");
const secBalance = document.getElementById("sec-balance");
const secReportes = document.getElementById("sec-reportes");

const NuevaOperacion = document.getElementById("nueva-operacion");
const SecNuevaOperacion = document.getElementById("sec-nueva-operacion");
const OperacionesAgregadas = document.getElementById("div-operaciones-agregadas");
const CancelarOperacion = document.querySelector("#cancelar-operacion");
const AgregarOperacion = document.querySelector("#agregar-operacion");
const SinOperaciones = document.getElementById("sin-operaciones");
const descriptNuevaOperacion = document.getElementById("descripcion-nueva-operacion");
const MontoNuevaOperacion = document.getElementById("monto-nueva-operacion");
const NuevasOperaciones = document.getElementById("contenedor-operaciones-agregadas");
const CategoriaNuevaOperacion = document.getElementById("categoria-nueva-operacion");
const FechaOperacion = document.getElementById("Fechita");
const TipoOperacion = document.getElementById("select-tipo-nueva-operacion");
const $buttonModo = $("#diseño");
const $body = document.querySelector("body");
const AgregarCategoria = document.getElementById("agregar-categoria");
const CategoriaNuevoNombre = document.getElementById("categoria-nuevo-nombre");
const SumarGanancia = document.querySelector(".Ganancias");
const SumarGastos = document.querySelector(".Gastos");
const Total = document.querySelector(".Total");
const OcultarFiltros = document.getElementById("ocultar-filtros");
const FormFiltros = document.getElementById("form");
const form = document.getElementById("form");
const filtroTipo = document.getElementById("select-tipo");
const filtroCategorias = document.getElementById("select-categoria");
const filtroFecha = document.getElementById("date");
const OrdenarPor = document.getElementById("ordenar-por");
const PanelReporte = document.getElementById("estadisticas-reportes");
const ResumenReporte = document.getElementById("resumen-reportes");
const ReportesOperaciones = document.getElementById("reportes-sin-operaciones");
const ReportesCategoria = document.getElementById("reportes-por-categorias");
const reportesTotalMes = document.getElementById("datos-totales-por-mes");

const NavBar = document.getElementById("navbar-burger");
const Menunavbar = document.getElementById("navbarBasicExample");

const formEditOperacion = document.querySelector(".edit-editar-operacion");
const edtiCategoria = document.querySelector(".editar-categorias");


NavBar.onclick = () => {
NavBar.classList.toggle("is-active");
Menunavbar.classList.toggle("is-active");
};

Balance.onclick = () => {
secCategorias.classList.add("is-hidden");
secBalance.classList.remove("is-hidden");
secReportes.classList.add("is-hidden");
};

Categorias.onclick = () => {
secCategorias.classList.remove("is-hidden");
secBalance.classList.add("is-hidden");
secReportes.classList.add("is-hidden");
SecNuevaOperacion.classList.add("is-hidden");
};

Reporte.onclick = () => {
secReportes.classList.remove("is-hidden");
secBalance.classList.add("is-hidden");
secCategorias.classList.add("is-hidden");
};

$buttonModo.addEventListener("click", (e) => {
  e.preventDefault();
  $body.classList.toggle("oscuro");
});

NuevaOperacion.onclick = () => {
SecNuevaOperacion.classList.remove("is-hidden");
secBalance.classList.add("is-hidden");
};

AgregarOperacion.onclick = () => {
SecNuevaOperacion.classList.add("is-hidden");
};

CancelarOperacion.onclick = () => {
SecNuevaOperacion.classList.add("is-hidden");
secCategorias.classList.add("is-hidden");
secBalance.classList.remove("is-hidden");
secReportes.classList.add("is-hidden");
};



let operaciones = [


];

const operacionesObtenidas = () => {
const operacionesLS = localStorage.getItem("operaciones");
if (operacionesLS === null) {
  return operaciones;
} else {
  SinOperaciones.classList.add("is-hidden");
  NuevasOperaciones.classList.remove("is-hidden");
  return JSON.parse(operacionesLS);
}
};

let funcionOperacionesLS = (elemento) => {
const operacionesAJSON = JSON.stringify(elemento);
localStorage.setItem("operaciones", operacionesAJSON);
};

const PintarEnBalances = (array) => {
const gananciasFiltradas = array.filter((elemento) => {
  return elemento.tipo === "ganancias";
});

const sumarGanancias = gananciasFiltradas.reduce((acc, elemento) => {
  let numeroMontoGanacia = Number(elemento.monto);
  return acc + numeroMontoGanacia;
}, 0);

return (SumarGanancia.textContent = sumarGanancias);
};
PintarEnBalances(operaciones);

const PintarGastos = (array) => {
const gastosFiltrados = array.filter((elemento) => {
  return elemento.tipo === "gastos";
});

const sumarGastos = gastosFiltrados.reduce((acc, elemento) => {
  let numeroMontoGastos = Number(elemento.monto);
  return acc + numeroMontoGastos;
}, 0);

return (SumarGastos.textContent = sumarGastos);
};
PintarGastos(operaciones);

const PintarTotal = (array) => {
const resultadoFinalGanancias = PintarEnBalances(array);
const resultadoFinalGastos = PintarGastos(array);
const resultadoFinal = resultadoFinalGanancias - resultadoFinalGastos;

return (Total.textContent = `$${resultadoFinal}`);
};
PintarTotal(operaciones);

const sinOperaciones = (array) => {
if (array.length === 0) {
  SinOperaciones.classList.remove("is-hidden");
  OperacionesAgregadas.classList.add("is-hidden");
  NuevasOperaciones.classList.add("is-hidden");
} else {
  SinOperaciones.classList.add("is-hidden");
  OperacionesAgregadas.classList.remove("is-hidden");
  NuevasOperaciones.classList.remove("is-hidden");
}
};
sinOperaciones(operaciones);

const borrarOperacion = (array) => {
const BorrasOperaciones = document.querySelectorAll(
  ".boton-borrar-operacion"
);
for (let i = 0; i < BorrasOperaciones.length; i++) {
  BorrasOperaciones[i].onclick = () => {
    const idOperaciones = BorrasOperaciones[i].id;
    const indiceOperaciones = idOperaciones.slice(7);
    const filtrarOperaciones = array.filter((elemento, index) => {
      return index != indiceOperaciones;
    });

    funcionOperacionesLS(filtrarOperaciones);
    PintarOperaciones(filtrarOperaciones);
  };
}
PintarEnBalances(operaciones);
PintarGastos(operaciones);
PintarTotal(operaciones);
};

const PintarOperaciones = (array) => {
operaciones = operacionesObtenidas();

const html = array.reduce((acc, operacion, index) => {
  return (
    acc +
    `
    <div class="fila columns is-mobile is-multiline">
    <div class="column  has-text-weight-semibold ">
      <p>${operacion.descripcion}</p>
      </div>
      <div class="column is-2-tablet is-6-mobile has-text-right-mobile">
      <p class="tag is-primary is-light">${operacion.categoria}</p>
      </div>
      <div class="column  has-text-left is-hidden-mobile">
      <p>${operacion.fecha}</p>
      </div>
      <div class="column  is-6-mobile is-size-4-mobile">
      <p class=" ${
        operacion.tipo === "ganancias"
          ? "has-text-success"
          : "has-text-danger"
      }">$${operacion.monto}</p>
      </div>
      <div class="column is-6-mobile has-text-right">
      <button id="editar-operaciones-${index}" class="button is-info is-inverted editar-operaciones">Editar</button>
      <button id="borrar-${index}"  class="boton-borrar-operacion button is-info is-inverted ">Eliminar</button>
      </div>
    </div>
    `
  );
}, "");

OperacionesAgregadas.innerHTML = html;

borrarOperacion(operaciones);

sinOperaciones(operaciones);
};

AgregarOperacion.onclick = () => {
secCategorias.classList.add("is-hidden");
SecNuevaOperacion.classList.add("is-hidden");
secBalance.classList.remove("is-hidden");
SinOperaciones.classList.add("is-hidden");
OperacionesAgregadas.classList.remove("is-hidden");
NuevasOperaciones.classList.remove("is-hidden");

const valordescriptNuevaOperacion = descriptNuevaOperacion.value;
const valorMontoNuevaOperacion = MontoNuevaOperacion.value;
const valorOpcionCategoriaNuevaOperacion = CategoriaNuevaOperacion.value;
const valorFechaOperacion = FechaOperacion.value;
const valorOpcionTipoNuevaOperacion = TipoOperacion.value;

const operacion = {
  descripcion: valordescriptNuevaOperacion,
  categoria: valorOpcionCategoriaNuevaOperacion,
  fecha: valorFechaOperacion,
  monto: valorMontoNuevaOperacion,
  tipo: valorOpcionTipoNuevaOperacion,
};

operaciones.push(operacion);
funcionOperacionesLS(operaciones);
PintarOperaciones(operaciones);
PintarEnBalances(operaciones);
PintarGastos(operaciones);
PintarTotal(operaciones);
valordescriptNuevaOperacion.value = "";
valorMontoNuevaOperacion.value = "";
valorOpcionCategoriaNuevaOperacion.value = "";
valorFechaOperacion.value = "";
valorOpcionTipoNuevaOperacion.value = "";
};

operaciones = operacionesObtenidas();
PintarOperaciones(operaciones);

borrarOperacion(operaciones);

const FechaMasReciente = (array) => {
return array.sort((a, b) => {
  return new Date(a.fecha) - new Date(b.fecha);
});
};

const FechaMenosReciente = (array) => {
return array.sort((a, b) => {
  return new Date(b.fecha) - new Date(a.fecha);
});
};
const ordenarAZ = (array) => {
return array.sort();
};

const ordenarZA = (array) => {
return array.sort().reverse();
};
const MayorMonto = (array) => {
return array.sort((a, b) => {
  return a.monto - b.monto;
});
};
const MenorMonto = (array) => {
return array.sort((a, b) => {
  return b.monto - a.monto;
});
};

const FiltrarOrdenarPor = (array) => {
if (OrdenarPor.value === "Más reciente") {
  return FechaMasReciente(array);
} else if (OrdenarPor.value === "Menos reciente") {
  return FechaMenosReciente(array);
} else if (OrdenarPor.value === "Mayor monto") {
  return MayorMonto(array);
} else if (OrdenarPor.value === "Menor monto") {
  return MenorMonto(array);
} else if (OrdenarPor.value === "A/Z") {
  return ordenarAZ(array);
} else {
  return ordenarZA(array);
}
};
const aplicarFiltros = () => {
const tipo = filtroTipo.value; //filtro por tipo
const FiltrarPorTipo = operaciones.filter((operacion) => {
  if (tipo === "Todos") {
    return operacion;
  }
  return operacion.tipo === tipo;
});

const categoriaSelect = filtroCategorias.value; //filtro por categoria aplicando el filtro de tipo
const filtradoPorCategoria = FiltrarPorTipo.filter((operacion) => {
  if (categoriaSelect === "Todas") {
    return operacion;
  }
  return operacion.categoria === categoriaSelect;
});

  const FiltrarPorFecha = filtradoPorCategoria.map((operacion) => {
  const nuevoElemento = {...operacion };
  nuevoElemento.fecha = new Date(operacion.fecha).toLocaleDateString();
  return nuevoElemento;
});

return FiltrarOrdenarPor(FiltrarPorFecha);
};

filtroTipo.onchange = () => {
const arrayFiltrado = aplicarFiltros();
PintarOperaciones(arrayFiltrado);
};

filtroCategorias.onchange = () => {
const arrayFiltrado = aplicarFiltros();
PintarOperaciones(arrayFiltrado);
};


filtroFecha.oninput = () => {
const arrayFiltrado = aplicarFiltros();
PintarOperaciones(arrayFiltrado);
};

OrdenarPor.onchange = () => {
const arrayFiltrado = aplicarFiltros();
PintarOperaciones(arrayFiltrado);
};

const CerrarFiltros = (box, boton) => {
box.classList.add("is-hidden");
boton.textContent = "Mostrar filtros";
};
const mostrarFiltros = (box, boton) => {
box.classList.remove("is-hidden");
boton.textContent = "Ocultar filtros";
};

OcultarFiltros.onclick = () => {
if (OcultarFiltros.textContent === "Ocultar filtros") {
  return CerrarFiltros(FormFiltros, OcultarFiltros);
} else {
  return mostrarFiltros(FormFiltros, OcultarFiltros);
}
};

form.onsubmit = (e) => {
e.preventDefault();
};
// Sec categorias
const categorias = [
"Todos",
"Comida",
"Servicios",
"Salidas",
"Mascotas",
"Compras",
"Trabajo",
];
const categoriasObtenidas = () => {
const categoriasLS = localStorage.getItem("categorias");
if (categoriasLS === null) {
  return categorias;
} else {
  return JSON.parse(categoriasLS);
}
};
let funcionLS = (elemento) => {
const categoriasAJSON = JSON.stringify(elemento);
localStorage.setItem("categorias", categoriasAJSON);
};

const AgregarNuevaCategoria = () => {
const categorias = categoriasObtenidas();
const selectCategoria = document.getElementById("select-categoria");

const CategoriasExistentes = categorias.reduce(
  (acc, elemento, index) => {
    return (
      acc +
      `<option id="opcion-categoria-${index}" value="${elemento}">${elemento}</option>`
    );
  },
 
);

selectCategoria.innerHTML = CategoriasExistentes;
CategoriaNuevaOperacion.innerHTML = CategoriasExistentes;
};

const agregarCategoriasAHTML = () => {
const categorias = categoriasObtenidas();
const lista = document.getElementById("lista-categoria");

const CategoriasExistentes = categorias.reduce(
  (acc, elemento, index) => {
    return (
      acc +
      ` <div class=" columns is-mobile">
           <div class="column">
                <span  id="nombre-categoria-${index}" class="nombre-categoria tag is-primary is-light">${elemento}</span>
           </div>
        <div class="column has-text-right">
                <button id="editar-categoria-${index}" class="button is-info is-inverted boton-editar-categoria">Editar</button>
            <button id="borrar-${index}"  class="boton-borrar button is-info is-inverted ">Eliminar</button>
        </div>
    </div>`
    );
  },
  ""
);

lista.innerHTML = CategoriasExistentes;

const botonesBorrar = document.querySelectorAll(".boton-borrar");

for (let i = 0; i < botonesBorrar.length; i++) {
  botonesBorrar[i].onclick = () => {
    const id = botonesBorrar[i].id;
    const indice = id.charAt(7);
    const nuevasCategoriasFiltradas = categorias.filter((elemento, index) => {
      return index != indice;
    });

    funcionLS(nuevasCategoriasFiltradas);

    agregarCategoriasAHTML();
    AgregarNuevaCategoria();
  };
}
};

agregarCategoriasAHTML(categorias);

AgregarCategoria.onclick = () => {
const valorInputCategoriaNuevo = CategoriaNuevoNombre.value;
const categorias = categoriasObtenidas();
categorias.push(valorInputCategoriaNuevo);
CategoriaNuevoNombre.value = "";

funcionLS(categorias);

AgregarNuevaCategoria();
agregarCategoriasAHTML();
};

const EditarseccionOperaciones = () => {
formEditOperacion.classList.remove("is-hidden");
const botonEditarOperaciones = document.querySelectorAll(
  ".editar-operaciones"
);

for (let i = 0; i < botonEditarOperaciones.length; i++) {
  botonEditarOperaciones[i].onclick = () => {
    const idEditar = botonEditarOperaciones[i].id;
    const idRecortado = idEditar.charAt(19);
    console.log(idRecortado);

    const idDelBoton = Number(idRecortado);
    console.log(idDelBoton);

    EditarOperacionesDiv(idDelBoton);
    ocultarSecciones();
  };
}
};
EditarseccionOperaciones();
const EditarOperacionesDiv = (idDelBoton) => {
operaciones = operacionesObtenidas();
const objeto = operaciones[idDelBoton];

formEditOperacion.innerHTML = `
  <div class="tarjeta-editar-operacion column is-offset-2 is-8 is-hidden is-relative">
      <form class="box form-seccion-operacion">
          <h2 class="title is-1 has-text-weight-bold">Editar operación</h2>
          <div class="field">
              <div class="control">
                  <label for="Descripción" class="label"> Descripción </label>
                  <input class="input" id="input-descripcion" type="text" value="${objeto.descripcion}">
              </div>
          </div>
          <div class="field">
              <div class="control">
                  <label for="Monto" class="label"> Monto</label>
                      <input class="input" id="input-monto" type="number" value="${objeto.monto}">
              </div>
          </div>
          <div class="field">
              <div class="control">
                  <label for="Tipo" class="label"> Tipo</label>
                  <div class="select is-fullwidth">
                      <select id="editar-tipo-operacion">
                      <option value="ganancias">Ganancias</option>
                      <option value="gastos">Gastos</option>
                      </select>
                  </div>
              </div>
          </div>
          <div class="field">
              <label for="Categoria" class="label">Categoria</label>
              <div class="control">
                  <div class="select is-fullwidth">
                      <select id="input-categoria">
                      <option>Gasto</option>
                      <option>Ganancia</option>
                      </select>
                  </div>
              </div>         
          </div>
          <div class="field">
              <div class="control">
                  <label for="Fecha" class="label"> Fecha</label>
                  <input class="input" type="date">
              </div>
          </div>
     
      <div class="has-text-right">
              <button type="button" id="boton-cancelar-seccion-operaciones" class="button is-light"> Cancelar </button>
              <input type="submit" value="Editar"  class="button is-success">
          </div>
      </form>
  </div>`;

const SeccionOperacion = document.querySelector(
  ".form-seccion-operacion"
);
const DescripcionInput = document.getElementById("input-descripcion");
const inputMonto = document.getElementById("input-monto");
const editarTipoOperacion = document.querySelector("#editar-tipo-operacion");

const CancelarOperaciones = document.querySelector(
  "#boton-cancelar-seccion-operaciones"
);

CancelarOperaciones.onclick = (e) => {
  e.preventDefault();
  ocultarSecciones();
  DescripcionInput.value = objeto.descripcion;
};

SeccionOperacion.onsubmit = (e) => {
  e.preventDefault();
  ocultarSecciones();

  const valorMonto = Number(inputMonto.value);
  const valorDescripcion = DescripcionInput.value;
  objeto.monto = valorMonto;
  objeto.descripcion = valorDescripcion;
  PintarOperaciones(operaciones);
  EditarseccionOperaciones();
};
};
const ocultarSecciones = () => {
const tarjetaEditarOperacion = document.querySelector(".tarjeta-editar-operacion");
secBalance.classList.toggle("is-hidden");
tarjetaEditarOperacion.classList.toggle("is-hidden");
};

const botonEditarSeccionCategoria = () => {
const EditCategoria = document.querySelectorAll(".boton-editar-categoria");

for (let i = 0; i < EditCategoria.length; i++) {
  EditCategoria[i].onclick = () => {
    const EditCategoriaEditada = document.querySelector(
      ".boton-editar-categoria-editada"
    );
    const nombreCategoria = document.querySelectorAll(".nombre-categoria");
    const EditarNombreCategoria = document.querySelector(".input-categorias-nombre-editar");

    EditarNombreCategoria.value = nombreCategoria[i].textContent;

    ocultarSeccionesCategoria();

    EditCategoriaEditada.onclick = () => {
      ocultarSeccionesCategoria();
      nombreCategoria[i].textContent = EditarNombreCategoria.value;
    };
    botonCancelarDentroCategoria();
  };
}
};
botonEditarSeccionCategoria();
const botonCancelarDentroCategoria = () => {
const CancelarCategoria = document.querySelector(".boton-cancelar-categoria-editada");
CancelarCategoria.onclick = () => {
  ocultarSeccionesCategoria();
};
};
// funcion auxiliar ocultar secciones- categoria
const ocultarSeccionesCategoria = () => {
secCategorias.classList.toggle("is-hidden");
edtiCategoria.classList.toggle("is-hidden");
};

const VerReporte = (operaciones) => {
if (operaciones.length > 2) {
  PanelReporte.classList.remove("is-hidden");
} else {
  ReportesOperaciones.classList.remove("is-hidden");
}
};
VerReporte(operaciones);

const montoMayorGanancia = (array) => {
const mayorMonto = array.reduce((acc, elemento) => {
  if (acc < elemento.monto) {
    return elemento.monto;
  }
  return acc;
}, 0);
return mayorMonto;
};
const categoriaConMayorGanancia = (array) => {
const filtrarTipo = array.filter((elemento) => {
  return elemento.tipo === "ganancias";
});
const filtrarCategoria = filtrarTipo.reduce((acc, elemento) => {
  if (acc > elemento.monto) {
    return acc;
  }
  return elemento.categoria;
}, 0);
return filtrarCategoria;
};

const montoMayorGasto = (array) => {
const filtrarTipo = array.filter((elemento) => {
  return elemento.tipo === "gastos";
});
const filtrarmenorGasto = filtrarTipo.reduce((acc, elemento) => {
  if (acc < elemento.monto) {
    acc = elemento.monto;
  }
  return acc;
}, 0);
return filtrarmenorGasto;
};

const categoriaConMayorGasto = (array) => {
const filtrarTipo = array.filter((elemento) => {
  return elemento.tipo === "Gasto";
});
const filtrarmenorGasto = filtrarTipo.reduce((acc, elemento) => {
  if (acc < elemento.monto) {
    acc = elemento.categoria;
  }
  return acc;
}, 0);
return filtrarmenorGasto;
};

const contenedorReportes = () => {
const ResumenReporte = document.querySelector(".resumen");
ResumenReporte.innerHTML = `<div class="columns  is-mobile">
      <div class="column is-6 has-text-weight-semibold">Categoría con mayor ganancia</div>
      <div class="column mt-3 is-1 has-text-right tag is-primary is-light">${categoriaConMayorGanancia(
        operaciones
      )}</div>
      <div class="column is-4 has-text-right has-text-success has-text-weight-semibold">+$${montoMayorGanancia(
        operaciones
      )}</div>  
  </div>
  <div class="columns  is-mobile">
      <div class="column is-6 has-text-weight-semibold">Categoría con mayor gasto</div>
      <div class="column mt-3 is-1 has-text-right tag is-primary is-light">${categoriaConMayorGasto(
        operaciones
      )}</div>
      <div class="column is-4  has-text-right has-text-danger has-text-weight-semibold">-$${montoMayorGasto(
        operaciones
      )}</div>  
  </div>
  <div class="columns  is-mobile">
      <div class="column is-6 has-text-weight-semibold">Categoría con mayor balance</div>
      <div class="column mt-3 is-1 has-text-right tag is-primary is-light">${categoriaConMayorGanancia(
        operaciones
      )}</div>
      <div class="column  is-4 has-text-right has-text-weight-semibold">$${montoMayorGanancia(
        operaciones
      )}</div>  
  </div>
  <div class="columns  is-mobile">
      <div class="column is-6 has-text-weight-semibold">Mes con mayor ganancia</div>
      <div class="column is-1 has-text-right">Fecha</div>
      <div class="column is-4  has-text-right has-text-success has-text-weight-semibold">$${montoMayorGanancia(
        operaciones
      )}</div>  
  </div>
  <div class="columns  is-mobile">
      <div class="column is-6 has-text-weight-semibold">Mes con mayor gasto</div>
      <div class="column is-1 has-text-right">Fecha</div>
      <div class="column is-4 has-text-right has-text-danger has-text-weight-semibold">-$${montoMayorGasto(
        operaciones
      )}</div>  
  </div>`;
};
contenedorReportes();

const DividirPorCateg = (array) => {
const categoriasSepadas = array.map((elemento) => {
  return elemento.categoria;
});
return categoriasSepadas;
};

const todasLasCategorias = DividirPorCateg(operaciones);

const CategSinCrear = todasLasCategorias.filter((elemento, index) => {
return todasLasCategorias.indexOf(elemento) === index;
});

let Categoria = [

];

CategSinCrear.map((categoria) => {
Categoria.push([]);
});

operaciones.map((operacion) => {
const indiceCategoria = CategSinCrear.indexOf(operacion.categoria);
Categoria[indiceCategoria].push(operacion);
});

let html = "";
for (let i = 0; i < Categoria.length; i++) {
let gananciasPorCategoria = [];
let gastosPorCategoria = [];
for (let j = 0; j < Categoria[i].length; j++) {
  if (Categoria[i][j].tipo === "gastos") {
    gastosPorCategoria.push(Categoria[i][j]);
  } else {
    gananciasPorCategoria.push(Categoria[i][j]);
  }
}

const categoriasSolas = CategSinCrear.reduce((acc, elemento) => {
  return elemento;
}, "");

const totalGastosPorCategoria = gastosPorCategoria.reduce((acc, elemento) => {
  let gastosMonto = Number(elemento.monto);
  return acc + gastosMonto;
}, 0);

const totalGananciasPorCategoria = gananciasPorCategoria.reduce(
  (acc, elemento) => {
    let gananciasMonto = Number(elemento.monto);
    return acc + gananciasMonto;
  },
  0
);

const sumarTotales = totalGananciasPorCategoria - totalGastosPorCategoria;

html =
  html +
  `<div class="columns  is-mobile">
                                  <div class="column  has-text-weight-semibold">${categoriasSolas}</div>
                                  <div class="column  has-text-success has-text-right">+${totalGananciasPorCategoria}</div>
                                  <div class="column  has-text-danger  has-text-right">-${totalGastosPorCategoria}</div>
                                  <div class="column  has-text-right">${sumarTotales}</div>
                              </div>`;
ReportesCategoria.innerHTML = html;
}

});























































































































































































































































































































































