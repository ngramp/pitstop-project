import React from 'react';
import PitStopList from './PitStopList';
import logo from './logo.svg';

const client = require('./libs/Client');
const follow = require('./libs/follow');
const root = '/api';
const stompClient = require('./libs/websocket-listener');

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sort: "timeIn,desc",
            pitStops: [],
            attributes: [],
            page: {
                size:20
            },
            links: {}
        };
        this.updatePageSize = this.updatePageSize.bind(this);
        this.onNavigate = this.onNavigate.bind(this);
        this.onUpdate = this.onUpdate.bind(this);
        this.loadFromServer = this.loadFromServer.bind(this);
        this.refreshAndGoToFirstPage = this.refreshAndGoToFirstPage.bind(this);
        this.refreshCurrentPage = this.refreshCurrentPage.bind(this);
    }

    componentDidMount() {
        this.loadFromServer(this.state.page.size);
        stompClient.register([
		{route: '/topic/newPitStopEntity', callback: this.refreshAndGoToFirstPage},
		{route: '/topic/updatePitStopEntity', callback: this.refreshCurrentPage}
	]);
    }

    async loadFromServer(pageSize) {
        const pitStopCollection = await follow(client, root, [
            {rel: 'pitstops', params: {
                size: pageSize,
                sort: this.state.sort
            }}
        ]);
        const schema = await client({
            method: 'GET',
            path: pitStopCollection.entity._links.profile.href,
            headers: {Accept: 'application/schema+json'}
        });

        this.schema = schema.entity;
        this.setState({
            pitStops: pitStopCollection.entity._embedded.pitstops,
            attributes: Object.keys(this.schema.properties),
            page: pitStopCollection.entity.page,
            links: pitStopCollection.entity._links
        });
        //window.console.log(Object.keys(this.schema.properties))
    }

    updatePageSize(pageSize) {
        if (pageSize !== this.state.page.size) {
            this.loadFromServer(pageSize);
        }
    }

    async onNavigate(navUri) {
        const pitStopCollection = await client({method: 'GET', path: navUri, params: "junk"});
        //window.console.log(pitStopCollection);
        this.setState({
            pitStops: pitStopCollection.entity._embedded.pitstops,
            attributes: this.state.attributes,
            page:  pitStopCollection.entity.page,
            links: pitStopCollection.entity._links
        });
    }

    async onUpdate(pitStop, updatedPitStop) {
        //window.console.log(pitStop);
        const response = await client({
            method: 'PUT',
            path: pitStop._links.self.href,
            entity: updatedPitStop,
            headers: {
                'Content-Type': 'application/json'
            }
        });
        //use web sockets
        //this.loadFromServer(this.state.pageSize);
    }

    async refreshAndGoToFirstPage(message) {
        const response = await follow(client, root, [{
            rel: 'pitstops',
            params: {
                size: this.state.page.size,
                sort: this.state.sort
            }
        }]);
        if (response.entity._links.first !== undefined) {
            this.onNavigate(response.entity._links.first.href);
        } else {
            //this.onNavigate(response.entity._links.self.href);
        }
    }

    async refreshCurrentPage(message) {
       // window.console.log(this.state.page)
        const pitStopCollection = await follow(client, root, [{
            rel: 'pitstops',
            params: {
                size: this.state.page.size,
                page: this.state.page.number,
                sort: this.state.sort
            }
        }]);
        this.links = pitStopCollection.entity._links;
        this.page = pitStopCollection.entity.page;

        // const pitStops = await Promise.all(pitStopCollection.entity._embedded.pitstops.map(pitStop => {
        //     return client({
        //         method: 'GET',
        //         path: pitStop._links.self.href
        //     })
        // }));
        this.setState({
            page: this.page,
            pitStops:  pitStopCollection.entity._embedded.pitstops,
            attributes: Object.keys(this.schema.properties),
            links: this.links
        });
    }

    render() {
        return (
            <div className="App">
                <div className="App-header">
                    <img src={logo} className="App-logo" alt="logo"/>
                    <h2>Welcome to PitStops</h2>
                </div>
                <div>
                    <PitStopList
                        pitStops={this.state.pitStops}
                        links={this.state.links}
                        pageSize={this.state.page.size}
                        onNavigate={this.onNavigate}
                        updatePageSize={this.updatePageSize}
                        onUpdate={this.onUpdate}
                        attributes={this.state.attributes}
                    />
                </div>
            </div>
        );
    }
}

export default App;
