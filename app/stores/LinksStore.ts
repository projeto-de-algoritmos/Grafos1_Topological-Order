'use strict';

import {find, uniq} from 'lodash';
import {observable, action, computed, IObservableArray} from 'mobx';

import { getNodes, topologicalSort, generateLinksSet } from '../utils/utils';

export default class LinksStore {

    static isLinkValid = isLinkValid;
    
    @observable links: IObservableArray<string> = observable([].concat(randomStringLinks()));

    @action addLink(link: string): void {
        if (isLinkValid(link)) {
            this.links.push(link.trim());
        }
    }

    @action clearAll() {
        this.links.replace([]);
    }

    @action generateLinks() {
        this.links.replace(randomStringLinks());
    }

    @computed get linksData() {
        return getLinks(this.links.slice());
    }

    @computed get nodes() {
        return getGraphConfig(this.links.slice());
    }

    @computed get topologicalOutput() {
        return topologicalOutput(this.links.slice());
    }

}

const randomStringLinks = () => generateLinksSet().map(pair => pair.join(' '));
const detectSeparator = (link: string) => !!link.match('-') ? '-' : ' ';

function isLinkValid(link: string): boolean {
    return link.trim().split(detectSeparator(link)).length === 2;
}

function getLinks(arr): Array<[string, string]> {
    return arr.map(item => {
        return item.split(detectSeparator(item)).map(f => f.trim());
    });
}

function topologicalOutput(links) {
    return topologicalSort(getLinks(links)).join(' - ') || 'Impossible';
}

type GraphConfig = {
    nodes: Array<{id: string; label: string}>;
    edges: Array<{from: string; to: string}>;
};
function getGraphConfig(links): GraphConfig {
    return getLinks(links)
        .reduce((res, links, i) => {
            const {nodes, edges} = res;
            const items = links.reduce((res, link) => {
                const exist = find(nodes, {label: link});
                const item = exist || {id: nodes.length + 1, label: link};
                if (!exist) {
                    nodes.push(item);
                }
                res.push(item);
                return res;
            }, []);
            edges.push({from: items[0].id, to: items[1].id});
            return res;
        }, {nodes: [], edges: []});
}