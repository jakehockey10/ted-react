var PlaylistList = React.createClass({displayName: 'PlaylistList',
    getInitialState: function () {
        return { data: [] };
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
    handleListItemClicked: function (id) {
        var playlists = this.state.data.playlists.map(function (playlist) { return playlist.playlist });
        var playlist = _.find(playlists, { id: id });
        this.refs.playlistView.setState({ playlist: playlist });
    },
    render: function () {
        var self = this;
        if (this.state.data.constructor === Object) {
            var playlists = this.state.data.playlists.map(function (playlist) {
                return (
                    <PlaylistListItem playlist={playlist.playlist} onListItemClicked={self.handleListItemClicked}/>
                )
            });
            return (
                <div className="playlistPage">
                    <div className="playlistList col-md-6">
                        {playlists}
                    </div>
                    <div className="playlistView col-md-6">
                        <PlaylistView ref="playlistView"/>
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

var PlaylistListItem = React.createClass({
    handleClick: function (event) {
        console.log('an item is clicked', this.props.playlist);
        this.props.onListItemClicked(this.props.playlist.id);
    },
    render: function () {
        var playlist = this.props.playlist;
        return (
            <div className="playlist row" onClick={this.handleClick}>
                <h2 className="playlistTitle">
                    {playlist.title}
                </h2>
                <div className="playlistCreated col-md-6">
                    {playlist.created_at}
                </div>
                <div className="playlistUpdated col-md-6">
                    {playlist.updated_at}
                </div>
            </div>
        )
    }
});

var PlaylistView = React.createClass({
    getInitialState: function () {
        return { playlist: null }
    },
    render: function () {
        if (this.state.playlist) {
            return (
                <div className="playlistView">
                    <h1 className="playlistTitle">
                        {this.state.playlist.title}
                    </h1>
                    <p>
                        {this.state.playlist.description}
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