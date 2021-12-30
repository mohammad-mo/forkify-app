import View from './View.js'

// import icons from '../img/icons.svg' // parcel 1
import icons from 'url:../../img/icons.svg' // parcel 2

class AddRecipeView extends View
{
    _parentElement = document.querySelector('.upload')
    _message = 'Recipe was successfully uploaded.'

    _window = document.querySelector('.add-recipe-window')
    _overlay = document.querySelector('.overlay')
    _btnOpen = document.querySelector('.nav__btn--add-recipe')
    _btnClose = document.querySelector('.btn--close-modal')

    constructor()
    {
        super()
        this._addHandlerShowWindow()
        this._addHandlerHideWindow()
    }

    toggleWindow()
    {
        this._overlay.classList.toggle('hidden')
        this._window.classList.toggle('hidden')
    }

    _addHandlerShowWindow()
    {
        this._btnOpen.addEventListener('click', this.toggleWindow.bind(this))

        /**
        *  Can't do this because the this keyword inside of a handler function
        *  points to the element that listener is attached to.(in this case this._btnOpen)
        */
        // this._btnOpen.addEventListener('click', function ()
        // {
            // this._overlay.classList.toggle('hidden')
            // this._window.classList.toggle('hidden')
        // })

        // Another solution is using arrow function :
        // this._btnOpen.addEventListener('click', () =>
        // {
            // this._overlay.classList.toggle('hidden')
            // this._window.classList.toggle('hidden')
        // })
    }

    _addHandlerHideWindow()
    {
        this._btnClose.addEventListener('click', this.toggleWindow.bind(this))
    }

    addHandlerUpload(handler)
    {
        this._parentElement.addEventListener('submit', function (e) 
        {
            e.preventDefault()
            const dataArray = [...new FormData(this)] // this points to this._parentElement because we are inside of the handler function.
            // Object.fromEntries: takes an array of entries and convert it to an object.(['title', 'TEST'] to title: "TEST")
            const data = Object.fromEntries(dataArray)
            handler(data)
        })
    }

    _generateMarkup() {}

    
}

export default new AddRecipeView()