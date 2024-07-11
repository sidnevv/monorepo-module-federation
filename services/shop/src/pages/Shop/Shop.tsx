import React from 'react';
import {Link} from 'react-router-dom'

import {shopRoutes} from '@packages/shared/src/routes/shop'

const Shop = () => {
    return (
        <div>
            <h1>SHOP</h1>
            <div>
                <Link to={shopRoutes.second}>go to second page</Link>
            </div>
        </div>
    );
};

export default Shop;