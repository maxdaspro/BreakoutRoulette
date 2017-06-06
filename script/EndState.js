var EndState = {};

EndState.preload = function () {

}

EndState.create = function () {
    console.log('EndState');

    $('#interface #content').load('template/end.phtml', () => {
        
        console.log('end loaded');
    });
}

EndState.update = function () {


}