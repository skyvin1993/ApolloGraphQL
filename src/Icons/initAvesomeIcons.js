import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { faStroopwafel, faStar } from '@fortawesome/free-solid-svg-icons'

export default () => library.add( 
    far,
    fab,
    faStroopwafel,
    faStar
);