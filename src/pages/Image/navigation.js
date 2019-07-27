import React, { Component } from 'react';
import { Breadcrumb, Icon } from 'antd';
import PropTypes from 'prop-types'

class Navigation extends Component {
    static propTypes = {
        path: PropTypes.string.isRequired,
        onChange:PropTypes.func
    };

    constructor() {
        super()
        this.state={
            navigation:[]
        }
    }
    
    componentDidMount(){
        const {path}=this.props
        const navigation=   this.parsePath(path)
        this.setState({navigation})
    }

    componentWillReceiveProps(nextProps){
        if(this.props.path!==nextProps.path){
            const navigation=  this.parsePath(nextProps.path)
            this.setState({navigation})
        }
    }

    // 返回一个数组
    parsePath(path){
        const pathList=path.split('/')
        let navigation=[]
        pathList.forEach((item,i)=>{
            if(item!==''){
                navigation.push({
                    type:i===1?'root':'dir',
                    name:item,
                    path:pathList.slice(0,i+1).join('/')
                })
            }
        })
        return navigation
    }

    render() {
        const {navigation}=this.state
        return (
            <div className="image-navigation">
                <Breadcrumb>
                    {
                        navigation.map((item,i)=>{
                            return ( 
                                <Breadcrumb.Item  
                                    key={item.name} 
                                    onClick={()=>{ this.props.onChange(item.path)}}>
                                    {
                                        item.type==='root'?
                                            <span className="image-navigation-root image-navigation-item">{'全部文件'}</span> : 
                                            <span className="image-navigation-item">{item.name}</span>
                                    }  
                                </Breadcrumb.Item>) 
                        })
                    }
                </Breadcrumb>
            </div>
        )
    }
}

export default Navigation