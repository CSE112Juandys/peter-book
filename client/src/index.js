import React from 'react';
import ReactDOM from 'react-dom';
import { createBrowserHistory } from "history";
import { Router, Route, Switch } from "react-router-dom";
import 'typeface-roboto';
import registerServiceWorker from 'registerServiceWorker';
import "assets/css/cl-components.css";
import { authGAPI } from "api/crypto";

import indexRoutes from "routes/index.js";

const hist = createBrowserHistory();
const pri_key = "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCgzDex/0+uKT5Z\nrMAfil5pWrP3j4T94StyYusyB82llh80FxjZyz7w/g0x2clPXpV6zuYSszEmRLyB\nCogDijcMOcWWtUqLkzfPkYeZ71IkoxZ5gHWdkxKm1WeDiJQ39h3EVTmSXqssZc4f\n3pHejPFGVYZPqohx63XtG6HeIxm65Ey+zZVOPB5IVyX0/iUPkV7lk7ApbIWqW0Po\nauwkUpCWIFcqTdPjhFzoP8PknofsHMGbjx5Aa2yUBDYBzdFXyzDZlICK1M4q2tUb\nKte5FIVRLvo1oX4vusU+2S+NRm5LFmJKcF48fXkIaqhflMlxb/p6h/bMDWn+yA7f\nn3UFHeuZAgMBAAECggEAF2H1vBZxRarCtzNLUZWDVX+2nvU0X4owZrcNa5494JVG\n3qzN1NIHn5ovXK9GZRp50zzQsSnJ/RN5dAG44LGR1V8gpWH3P/poXxtTDuasg8kM\nL3P85oKoxNul7LczkpBhfheZ7SKDcsvadcDzEQa0M/L45TnaaJ0sbg6ayHJDP217\naWFXY+bMQy21Mjg29QISuPqFejrgdrYdlQf0MRfXHZEIF1LpgeMRfOnIJMoEI2ss\nfmI9bQHoRhfja/Fa6E30/Nf2YsTVY9O7YAF8Spm/hgtm8N7IYa4FqkF1+/woofpJ\nsxvbZJ7uC+BOOOW7xZ6BL5QjKl48X6FQRDnwbdhtLwKBgQDYHMzSO5fKULqpdt6L\nb+430VOOoCJL7PjaNcPFDROZCybwhivOSez5M83aCIeJMNGrOYlSX5yTS0RA3AvF\nBuDi5ME+1o5DYfVlh5cXoeyuE021+uB9sjyLKv98IP0sWmexcXwzMOdARLLwC4DK\ncCLOSJuC2fw7dibvuqEgF6rnqwKBgQC+edLuueJzeiFhfBx2INodfhAG1UcXRfwg\nrs0+/y07fjOrY7jX73Q1P1ZGgCi3jajiGCZwXam0U5EAlz4ozIwOOhqVLST92mJ4\nCBl/YJ4rWjivXtm8MJ7y8+dN9kE+uyBDay0KIYCGsAlFSBy8M/y6/vrhV1lF6EVv\na7TzCNWlywKBgQCQDdqFxI1woZFbRs4fOhQbht/gsWNLIwHaSn5dilLm8CUbrQPk\nNSjOEDcGQCtASpdoQCkGDI+NK12qskLyKZycAYnCvjgEOHbgH5qaeSgP/PQO+tTL\nVJTA23+DmWXJO9Xk1NXKNa3gDCsOkUxfJJI+2O04Mt/MLvzTTZ77ims0kwKBgDuC\n3IBx22qw8dT/bfUKdptYU7GO2VNQLmIXu1C/cWZxG7ukwI/W5LvuOgp06EPRIr7h\nRME+wlLw+RDyMB2XKvsW9E8/d5tIrBNMlIrTqRdqbON+AxFlL4RA6DfXhLMQzBfE\nWKIdrYZnYb4ftbqnk4LpP4FARUguNeOGB1cXn4jZAoGAa/oGsBktZgpK0f31n0ml\n7FIwxMSWFqxZhFWpRxNEsnRWCLEwtzPrvXym1emEvXg0IjZLuBbKwZ/vxuBicn/0\nGH6z6fz82/aF1CVRbf+yOsyST1FqsOagtao90p9s5Dge7JmbZBV6z+C597Qc7uTm\nZdM79HWHNdwD1d0YUdHeiS4=\n-----END PRIVATE KEY-----\n";

authGAPI(pri_key);

ReactDOM.render(
    <Router history={hist}>
      <Switch>
        {indexRoutes.map((prop, key) => {
          return <Route path={prop.path} component={prop.component} key={key} />;
        })}
      </Switch>
    </Router>,
    document.getElementById("root")
);
registerServiceWorker();
