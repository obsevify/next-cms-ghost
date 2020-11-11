import React from 'react'
import rehypeReact, { ComponentProps } from 'rehype-react'
import unified from 'unified'
import { Node } from 'unist'

import { NextLink } from '.'

const options = {
  createElement: React.createElement,
  Fragment: React.Fragment,
  passNode: true,
  components: {
    Link: (props: ComponentProps) => <NextLink {...props} />
  }
}

const renderAst = unified().use(rehypeReact, options)

interface RenderContentProps {
  htmlAst: Node | null
}

const RenderContent = ({ htmlAst }: RenderContentProps) => {
  if (!htmlAst) return null
  return (
    <>
      {renderAst.stringify(htmlAst)}
    </>
  )
}

export default RenderContent


//<div className="post-content load-external-scripts">{renderAst.stringify(htmlAst)}</div>
