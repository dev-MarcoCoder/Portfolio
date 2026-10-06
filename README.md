# Portfólio — Marco Aurélio Orlandini Mendonça

Portfólio pessoal em HTML, CSS e JavaScript puros (sem frameworks e sem etapa de build), com tema escuro.

## Estrutura

```
index.html                 página principal
css/style.css              estilos (tema escuro, responsivo)
js/main.js                 certificações, filtros, modal, animações
assets/curriculo-*.pdf     currículo
assets/certificados/       arquivos dos certificados
```

## Rodar localmente

Abra o `index.html` direto no navegador, ou sirva a pasta:

```bash
npx serve .
```

## Adicionar uma certificação

1. Coloque o arquivo (PDF/PNG/JPG) em `assets/certificados/`.
2. Adicione um item no array `CERTS` no início de `js/main.js`.
3. Atualize os números da seção "Sobre" no `index.html` (`data-count`).

## Publicar
