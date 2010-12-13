CRMLight.ActivitiesPageController = M.Controller.extend({

    activities: null,

    init: function() {

        M.Request.init({
            url: '/p13/lkk?method=getMyActivities&gvlID=0000069070',
            isJSON: NO,

            beforeSend: function(req) {
                M.LoaderView.show();
            },
            onSuccess: function(data){
                M.LoaderView.hide();
                //CRMLight.ActivitiesPageController.set('activities', data);
                CRMLight.ActivitiesPageController.handleResult(data);
            },
            onError: function(request, message){
                M.LoaderView.hide();
                console.log(message);
            }
        }).send();

    },

    openStartPage: function() {

        this.switchToPage(M.ViewManager.getPage('startPage'), null, YES);

    },

    handleResult: function(data) {
        console.log(data);
        var xmlParser = new DOMParser();
        var xmlDoc = xmlParser.parseFromString(data,"text/xml");
        console.log(xmlDoc);
        var activities = xmlDoc.documentElement.getElementsByTagName('activityList');
        var activityNode = null;
        var activity = null;

        var dateRegex = /([0-9]{4})([0-9]{2})([0-9]{2})([0-9]{2})([0-9]{2})([0-9]{2})/
        for(var i = 0; i < activities.length; i++) {
            activityNode = activities[i];
            console.log(activityNode);
            console.log(activityNode.getElementsByTagName('gvlID')[0]);

            var beginDate = '';
            var endDate;

            activity = CRMLight.Activity.createRecord({
                gvl:activityNode.getElementsByTagName('gvlID')[0].firstChild.nodeValue,
                beginDate:this.parseDate(activityNode.getElementsByTagName('dateFrom')[0].firstChild.nodeValue),
                endDate:this.parseDate(activityNode.getElementsByTagName('dateTo')[0].firstChild.nodeValue),
                category:activityNode.getElementsByTagName('category')[0].firstChild.nodeValue,
                description:activityNode.getElementsByTagName('description')[0].firstChild.nodeValue,
                processType:activityNode.getElementsByTagName('procType')[0].firstChild.nodeValue,
                status:activityNode.getElementsByTagName('status')[1].firstChild.nodeValue,
                result:activityNode.getElementsByTagName('result')[0].firstChild.nodeValue,
                customerId:activityNode.getElementsByTagName('customerID')[0].firstChild.nodeValue
            });

            activity.save();
        }

        M.Request.init({
            url: '/p13/lkk?method=getMyCustomers&gvlID=0000069070',
            isJSON: NO,

            beforeSend: function(req) {
                M.LoaderView.show();
            },
            onSuccess: function(data){
                M.LoaderView.hide();
                CRMLight.ActivitiesPageController.handleCustomerResult(data);
            },
            onError: function(request, message){
                M.LoaderView.hide();
                console.log(message);
            }
        }).send();
    },

    handleCustomerResult: function(data) {
        var xmlParser = new DOMParser();
        var xmlDoc = xmlParser.parseFromString(data,"text/xml");
        var customers = xmlDoc.documentElement.getElementsByTagName('activityList');

        var customerNode = null;
        var customer = null;
        for(var i = 0; i < customers.length; i++) {
            customerNode = activities[i];
            customer = CRMLight.Customer.createRecord({
                nr:customerNode.getElementsByTagName('id')[0].firstChild.nodeValue,
                customerName:customerNode.getElementsByTagName('customerName1')[0].firstChild.nodeValue,
                city:customerNode.getElementsByTagName('city')[0].firstChild.nodeValue,
                street:customerNode.getElementsByTagName('street')[0].firstChild.nodeValue,
                zipCode:customerNode.getElementsByTagName('zip')[0].firstChild.nodeValue
            });
            customer.save();
        }

        myJSONStructure = {};

        for(var act in CRMLight.Activity.records()) {
            
        }

        this.set('activities', CRMLight.Activity.records());
    },

    parseDate: function(dateStr) {
        // $1: year: 2010
        // $2: month: 11
        // $3: day: 09
        // $4: hour: 07
        // $5: minutes: 45
        // $6: seconds: 13
        var dateRegex = /([0-9]{4})([0-9]{2})([0-9]{2})([0-9]{2})([0-9]{2})([0-9]{2})/
        var res = dateRegex.exec(dateStr);
        return M.Date.create(res[1]+'/'+res[2]+'/'+res[3]+' '+res[4]+':'+res[5]+':'+res[6]);
    }


});