$(function() {
    bindAnimations(); //arrumar pois vai quebrar no ajax async na hora de chamar os jsons
});

function bindAnimations() {
    smartHover("#cursos .card");
}