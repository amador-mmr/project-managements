import { makeStyles } from '@mui/styles'
import MenuApp from '../menus/Menu'

const useStyles = makeStyles(() => ({
  root: {
    width: '100%',
    height: '100%',
  },
  page: {
    width: '100%',
    height: 'calc(100% - 64px)',
  },
}))

interface Props {
  children: any
}

const Layout = (props: Props) => {
  const classes = useStyles()

  const { children } = props
  return (
    <div className={classes.root}>
      <MenuApp />
      <div className={classes.page}>{children}</div>
    </div>
  )
}
export default Layout
