// const api = axios.create({
//   baseURL: "https://crud-de-recados.onrender.com",
// });

const urlParams = new URLSearchParams(window.location.search);
const limit = parseInt(urlParams.get("limit")) || 2;
let page = parseInt(urlParams.get("page")) || 1;

const div = document.getElementById("lista-dados");
const btnProximo = document.getElementById("proxima");
const btnAnterior = document.getElementById("anterior");

const fazerPaginacao = async () => {
  try {
    const data = {
      limit,
      page,
    };

    const response = await api.get("/recados", { params: data });

    const mensagem = response.data.data;

    mensagem.forEach((msg) => {
      const divCriada = document.createElement("div");
      divCriada.innerHTML = `<p>${msg.id}</p>
            <p>${msg.titulo}</p> 
            <p>${msg.descricao}</p>`;

      div.appendChild(divCriada);
    });
    btnAnterior.disabled = page === 1;
    btnProximo.disabled = response.data.totalPaginas === page;
  } catch (error) {
    console.log(error);
  }
};

fazerPaginacao();

const proximaPagina = () => {
  if (page) {
    page += 1;
    div.innerHTML = "";
    fazerPaginacao();
  }
};

const paginaAnterior = () => {
  if (page > 1) {
    page -= 1;
    div.innerHTML = "";
    fazerPaginacao();
  }
};
