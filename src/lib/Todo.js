// Helper function for generating unique IDs
function guidGenerator() {
    function S4() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }
    return S4()+S4()+'-'+S4()+'-'+S4()+'-'+S4()+'-'+S4()+S4()+S4();
}

export default class Todo {
    constructor(descriptionText, isDone, id) {
        this.descriptionText = descriptionText || '';
        this.isDone = isDone || false;
        this.id = id || guidGenerator();
        //bind this
        this.toggleDone = this.toggleDone.bind(this);
        this.remove = this.remove.bind(this);
    }

    toggleDone() {
        this.isDone = !this.isDone;
    }

    remove() {
        this.domain.removeTodo(this.id);
    }
}