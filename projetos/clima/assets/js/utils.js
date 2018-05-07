var $$ = document.querySelectorAll.bind(document);

function dateFix(num) {
    return num < 10 ? "0" + num : num.toString();
}