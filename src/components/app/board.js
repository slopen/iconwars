import React, {Component} from 'react';

import request from 'components/lib/request';

type Props = {};
type State = {
	icons?: Array <string []>,
	error?: string
};

const LOAD_INT = 3000;
const CHECK_INT = 60;

const requestIcons = (): Promise <string []> =>
	// $FlowFixMe
	request ({uri: '/api/icons'});


const Icon = ({icon}) =>
	<div className="icon">
		<img src={icon}/>
	</div>

const IconsRow = ({icons}) =>
	icons && icons [0] ? (
		<div className="icons-row">
			{icons.map ((url, index) =>
				<Icon key={index} icon={url}/>
			)}
		</div>
	) : (
		<div className="icons-row spacer"/>
	);

export default class Board extends Component <Props, State> {

	// _t: IntervalID;
	// _checkT: IntervalID;

	loadData: () => Promise <mixed>;
	checkFirstItem: Function;

	constructor (props: Props) {
		super (props);

		this.state = {
			icons: [[null]]
		};

		this.loadData = this.loadData.bind (this);
		this.checkFirstItem = this.checkFirstItem.bind (this);
	}

	componentDidMount () {
		this.loadData ();
		this._t = setInterval (this.loadData, LOAD_INT);
		this._checkT = setInterval (this.checkFirstItem, CHECK_INT);
	}

	componentWillUnmount () {
		clearInterval (this._t);
	}

	async loadData () {
		const {icons = []} = this.state;

		try {
			const update = await requestIcons ();
			const data = [...icons, update];

			this.setState ({
				icons: data
			});

		} catch (e) {
			this.setState ({
				error: e.message
			});
		}
	}

	checkFirstItem () {
		this.first = this.first ||
			document.querySelector ('#content .icons-row:first-child');

		if (this.first) {
			const {offsetTop, offsetHeight} = this.first;
			const {icons} = this.state;

			if (offsetHeight + offsetTop <= 0) {
				icons.shift ();
				this.setState ({icons});
				this.first = null;
			}

			if (icons.length > 10) {
				if (this._t !== null) {
					clearInterval (this._t);
					this._t = null;
				}
			} else if (this._t === null) {
				this._t = setInterval (this.loadData, LOAD_INT);
			}

		}

	}

	render () {
		const {icons} = this.state;

		return (
			<div className="board">
				<div id="content" className="content">
					{icons && icons.map ((icons) =>
						<IconsRow key={icons.join ()} icons={icons}/>
					)}
				</div>
			</div>
		);
	}
}



