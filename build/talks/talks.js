var converter = new Showdown.converter();

var TalkList = React.createClass({displayName: 'TalkList',
    getInitialState: function() {
        return {data: []};
    },
    componentDidMount: function () {
        $.ajax({
            url: this.props.url,
            dataType: 'json',
            success: function (data) {
                this.setState({
                    data: data
                });
            }.bind(this),
            error: function (xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    },
    handleListItemClicked: function(id) {
        console.log('handling clicked thing.');
        var talks = this.state.data.talks.map(function (talk) { return talk.talk });
        var talk = _.find(talks, {id: id});
        this.refs.talkView.setState({talk: talk})
    },
    render: function () {
        var self = this;
        if (this.state.data.constructor === Object) {
            var talks = this.state.data.talks.map(function (talk) {
                return (
                    <TalkListItem talk={talk.talk} onListItemClicked={self.handleListItemClicked}/>
                )
            });

            return (
                <div className="talkPage">
                    <div className="talkList col-md-6">
                        {talks}
                    </div>
                    <div className="talkView col-md-6">
                        <TalkView ref="talkView"/>
                    </div>
                </div>
            )
        } else {
            return (
                <h2>Loading...</h2>
            )
        }
    }
});

var TalkListItem = React.createClass({
    handleClick: function (event) {
        var talk = this.props.talk;
        console.log('an item is clicked', talk);
        this.props.onListItemClicked(talk.id)
    },
    render: function () {
        var talk = this.props.talk;
        var rawMarkup = converter.makeHtml(talk.description.toString());
        return (
            <div className="talk row" onClick={this.handleClick}>
                <h2 className="talkName">
                    {talk.name}
                </h2>
                <p dangerouslySetInnerHTML={{__html: rawMarkup}}>
                </p>
            </div>
        )
    }
});

var TalkView = React.createClass({
    getInitialState: function () {
        return { talk: null }
    },
    render: function () {
        var talk = this.state.talk;
        if (talk) {
            var rawMarkup = converter.makeHtml(talk.description.toString());
            return (
                <div className="talkView">
                    <h1 className="talkName">
                        {talk.name}
                    </h1>
                    <p dangerouslySetInnerHTML={{__html: rawMarkup}}>
                    </p>
                </div>
            )
        } else {
            return (
                <h2>Click an item to see details</h2>
            )
        }
    }
});