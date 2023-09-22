exports.id=521,exports.ids=[521],exports.modules={1629:(e,t,s)=>{s.d(t,{FocusWebviewProvider:()=>FocusWebviewProvider});var r=s(9496),o=s(5255),n=s(8887),i=s(4155),a=s(8834),u=s(5367),h=s(8452),c=s(4092),l=s(4321),p=s(3646),d=s(2674),f=s(4794),g=s(9529),m=s(7469),w=s(5798);const b=new w.ke("focus/pr/openWorktree"),R=new w.ke("focus/pr/openBranch"),y=new w.ke("focus/pr/switchToBranch"),q=new w.jH("focus/didChange",!0);class FocusWebviewProvider{constructor(e,t){this.container=e,this.host=t,this._disposable=r.Disposable.from(this.container.subscription.onDidChange(this.onSubscriptionChanged,this),this.container.git.onDidChangeRepositories((()=>{this.host.refresh(!0)})))}_pullRequests=[];_issues=[];_disposable;_etagSubscription;_repositoryEventsDisposable;_repos;dispose(){this._disposable.dispose()}registerCommands(){return[(0,g.xR)(o.Gh.RefreshFocus,(()=>this.host.refresh(!0)))]}onMessageReceived(e){switch(e.method){case R.method:(0,w.mq)(R,e,(e=>this.onOpenBranch(e)));break;case y.method:(0,w.mq)(y,e,(e=>this.onSwitchBranch(e)));break;case b.method:(0,w.mq)(b,e,(e=>this.onOpenWorktree(e)))}}findSearchedPullRequest(e){return this._pullRequests?.find((t=>t.pullRequest.id===e.id))}async getRemoteBranch(e){const t=e.pullRequest,s=e.repoAndRemote,o=s.repo.uri,n=await s.repo.getMainRepository();if(null==n)return void r.window.showWarningMessage(`Unable to find main repository(${o.toString()}) for PR #${t.id}`);const a=t.refs.base.owner,u=r.Uri.parse(t.refs.base.url),h=t.refs.head.branch,c=r.Uri.parse(t.refs.head.url),p=c.toString(),[,d,g]=(0,f.Sk)(p);let m,w;if([m]=await n.getRemotes({filter:e=>e.matches(d,g)}),null!=m)w=`${m.name}/${h}`,await this.container.git.fetch(n.path,{remote:m.name});else{const e=await r.window.showInformationMessage(`Unable to find a remote for '${p}'. Would you like to add a new remote?`,{modal:!0},{title:"Yes"},{title:"No",isCloseAffordance:!0});if("Yes"!==e?.title)return;const s=t.refs.head.owner;if(await(0,i.IH)(n,s,p,{confirm:!1,fetch:!0,reveal:!1}),[m]=await n.getRemotes({filter:e=>e.url===p}),null==m)return;w=`${m.name}/${h}`;const o=t.refs.base.repo,l=`pr/${u.toString()===c.toString()?h:w}`;this.container.git.setConfig(n.path,`branch.${l}.github-pr-owner-number`,`${a}#${o}#${t.id}`)}return{remote:m,reference:(0,l.xB)(w,n.path,{refType:"branch",name:w,remote:!0})}}async onOpenBranch({pullRequest:e}){const t=this.findSearchedPullRequest(e);if(null==t)return;const s=await this.getRemoteBranch(t);null!=s?(0,g.P0)(o.Gh.ShowInCommitGraph,{ref:s.reference}):r.window.showErrorMessage(`Unable to find remote branch for '${t.pullRequest.refs?.head.owner}:${t.pullRequest.refs?.head.branch}'`)}async onSwitchBranch({pullRequest:e}){const t=this.findSearchedPullRequest(e);if(null==t||t.isCurrentBranch)return;if(null!=t.branch)return a.gu(t.branch.repoPath,t.branch);const s=await this.getRemoteBranch(t);if(null!=s)return a.gu(s.remote.repoPath,s.reference);r.window.showErrorMessage(`Unable to find remote branch for '${t.pullRequest.refs?.head.owner}:${t.pullRequest.refs?.head.branch}'`)}async onOpenWorktree({pullRequest:e}){const t=this.findSearchedPullRequest(e);if(null==t?.repoAndRemote)return;const s=r.Uri.parse(e.refs.base.url),n=t.repoAndRemote.repo.uri;return(0,g.P0)(o.Gh.OpenOrCreateWorktreeForGHPR,{base:{repositoryCloneUrl:{repositoryName:e.refs.base.repo,owner:e.refs.base.owner,url:s}},githubRepository:{rootUri:n},head:{ref:e.refs.head.branch,sha:e.refs.head.sha,repositoryCloneUrl:{repositoryName:e.refs.head.repo,owner:e.refs.head.owner,url:r.Uri.parse(e.refs.head.url)}},item:{number:parseInt(e.id,10)}})}onSubscriptionChanged(e){e.etag!==this._etagSubscription&&(this._etagSubscription=e.etag,this.notifyDidChangeState(!0))}async getState(e){const t=this.host.id,s=await this.container.git.access(n.x.Focus);if(!0!==s.allowed)return{webviewId:t,timestamp:Date.now(),access:s};const r=await this.getRichRepos(),o=r.filter((e=>e.isGitHub));const i=function(e){return e.filter((e=>e.isConnected&&e.isGitHub))}(o);if(!(i.length>0))return{webviewId:t,timestamp:Date.now(),access:s,repos:o.map((e=>C(e)))};const a=i.map((e=>C(e))),u=Promise.allSettled([this.getMyPullRequests(i),this.getMyIssues(i)]);async function l(){const[e,r]=await u;return{webviewId:t,timestamp:Date.now(),access:s,repos:a,pullRequests:(0,m.Sb)(e)?.map((e=>({pullRequest:(0,c.l1)(e.pullRequest),reasons:e.reasons,isCurrentBranch:e.isCurrentBranch??!1,isCurrentWorktree:e.isCurrentWorktree??!1,hasWorktree:e.hasWorktree??!1,hasLocalBranch:e.hasLocalBranch??!1}))),issues:(0,m.Sb)(r)?.map((e=>({issue:(0,h.y$)(e.issue),reasons:e.reasons})))}}if(e)return queueMicrotask((async()=>{const e=await l();this.host.notify(q,{state:e})})),{webviewId:t,timestamp:Date.now(),access:s,repos:a};return await l()}async includeBootstrap(){return this.getState(!0)}async getRichRepos(e){if(null==this._repos||!0===e){const e=[],t=[];for(const s of this.container.git.openRepositories){const r=await s.getRichRemote();null==r||e.findIndex((e=>e.remote===r))>-1||(t.push(s.onDidChange(this.onRepositoryChanged,this)),e.push({repo:s,remote:r,isConnected:await r.provider.isConnected(),isGitHub:"github"===r.provider.id}))}this._repositoryEventsDisposable&&(this._repositoryEventsDisposable.dispose(),this._repositoryEventsDisposable=void 0),this._repositoryEventsDisposable=r.Disposable.from(...t),this._repos=e}return this._repos}async onRepositoryChanged(e){e.changed(p.I6.RemoteProviders,p.du.Any)&&(await this.getRichRepos(!0),this.notifyDidChangeState())}async getMyPullRequests(e){const t=[];for(const s of e){const e=s.remote,r=await this.container.git.getMyPullRequests(e);if(null!=r)for(const e of r){if(0===e.reasons.length)continue;const r={...e,repoAndRemote:s,isCurrentWorktree:!1,isCurrentBranch:!1},o=`${r.pullRequest.refs.head.owner}/${r.pullRequest.refs.head.branch}`,n=await(0,d.K)(r.repoAndRemote.repo,r.pullRequest.refs.head.branch,o);r.hasWorktree=null!=n,r.isCurrentWorktree=!0===n?.opened;const i=await(0,u.eK)(s.repo,o);i&&(r.branch=i,r.hasLocalBranch=!0,r.isCurrentBranch=i.current),t.push(r)}}function s(e){let t=0;return e.reasons.includes("authored")?t+=1e3:e.reasons.includes("assigned")?t+=900:e.reasons.includes("review-requested")?t+=800:e.reasons.includes("mentioned")&&(t+=700),e.pullRequest.reviewDecision===c.pD.Approved?e.pullRequest.mergeableState===c.Cz.Mergeable?t+=100:e.pullRequest.mergeableState===c.Cz.Conflicting?t+=90:t+=80:e.pullRequest.reviewDecision===c.pD.ChangesRequested&&(t+=70),t}return this._pullRequests=t.sort(((e,t)=>{const r=s(e),o=s(t);return r===o?e.pullRequest.date.getTime()-t.pullRequest.date.getTime():(o??0)-(r??0)})),this._pullRequests}async getMyIssues(e){const t=[];for(const{remote:s}of e){const e=await this.container.git.getMyIssues(s);null!=e&&t.push(...e.filter((e=>e.reasons.length>0)))}return this._issues=t.sort(((e,t)=>t.issue.updatedDate.getTime()-e.issue.updatedDate.getTime())),this._issues}async notifyDidChangeState(e){this.host.notify(q,{state:await this.getState(e)})}}function C(e){return{repo:e.repo.path,isGitHub:e.isGitHub,isConnected:e.isConnected}}}};