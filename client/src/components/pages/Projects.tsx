import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  FormControl,
  IconButton,
  MenuItem,
  Paper,
  Select,
  SelectChangeEvent,
  Slide,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material'
import { makeStyles } from '@mui/styles'
import axios from 'axios'
import moment from 'moment'
import { forwardRef, useEffect, useState } from 'react'
import NewEditProject from './NewEditProject'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import { TransitionProps } from '@mui/material/transitions'
import { useSnackbar } from 'notistack'
import { useNavigate } from 'react-router-dom'

const useStyles = makeStyles(() => ({
  root: {
    width: '100%',
    height: '100%',
    position: 'relative',
  },
  layoutTitle: {
    width: '100%',
    height: 100,
    paddingTop: '10px',
    paddingLeft: '30px',
  },
  layoutMain: {
    width: '100%',
    height: 'calc(100% - 100px)',
    display: 'flex',
    flexDirection: 'row',
    position: 'relative',
  },
  layoutTable: {
    height: '100%',
    padding: '10px',
    margin: '0 auto',
    transition: '1s all',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
}))

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />
})

export interface Project {
  id_project: string
  name: string
  code_3: string
  acquisition_date?: Date
  deal_type: string
  id_group: string
  status: string
  kw: number
  months_acquired?: number
  id_company: number
  wgt: string[]
}

const Projects = () => {
  const classes = useStyles()
  const { enqueueSnackbar } = useSnackbar()
  const navigate = useNavigate()

  const [projects, setProjects] = useState<Project[]>([])
  const [wgt, setWgt] = useState<{ number: string; idProject: string }[]>([])
  const [showNewEdit, setShowNewEdit] = useState<boolean>(false)
  const [current, setCurrent] = useState<Project | null>(null)
  const [open, setOpen] = useState<boolean>(false)
  const [idSelected, setIdSelected] = useState<string | null>(null)

  const handleClose = () => {
    setOpen(false)
  }

  useEffect(() => {
    if (localStorage.getItem('user') === null) {
      navigate('/login', { replace: true })
    }
    getProjects()
    getWgt()
  }, [])

  useEffect(() => {
    if (projects.length > 0 || wgt.length > 0) {
      let listProjects = projects
      listProjects.forEach((p) => (p.wgt = []))
      setProjects([...listProjects])
      wgt.forEach((w) => {
        const index = listProjects.findIndex(
          (p) => p.id_project === w.idProject
        )
        listProjects[index].wgt.push(w.number)
      })
      setProjects([...listProjects])
    }
  }, [wgt])

  const getProjects = async () => {
    try {
      setProjects([])
      const { data } = await axios.get('/api/projects', {
        headers: {
          'Content-type': 'application/json',
        },
      })
      let list: Project[] = []
      data.forEach((d: any) => {
        list.push({
          id_project: d.ID_PROJECT,
          name: d.NAME,
          code_3: d.CODE_3,
          acquisition_date: d.ACQUISITION_DATE,
          deal_type: d.DEAL_TYPE,
          id_group: d.ID_GROUP,
          status: d.STATUS,
          kw: d.KW,
          months_acquired: d.MONTHS_ACQUIRED,
          id_company: d.ID_COMPANY,
          wgt: [],
        })
      })
      setProjects([...list])
    } catch (error) {
      console.error(error)
    }
  }

  const getWgt = async () => {
    try {
      setWgt([])
      const { data } = await axios.get('/api/getAllwgt', {
        headers: {
          'Content-type': 'application/json',
        },
      })
      let list: { number: string; idProject: string }[] = []
      data.forEach((d: any) => {
        list.push({
          idProject: d.ID_PROJECT,
          number: d.WGT_NUMBER,
        })
      })
      setWgt([...list])
    } catch (error) {
      console.error(error)
    }
  }

  const deleteProject = async () => {
    try {
      const { data } = await axios.delete('/api/delete-project/' + idSelected, {
        headers: {
          'Content-type': 'application/json',
        },
      })
      if (data) {
        enqueueSnackbar('Delete project succesfully', {
          variant: 'success',
        })
        let list = projects.filter((p) => p.id_project !== idSelected)
        setProjects([...list])
      } else
        enqueueSnackbar('Error deleting project, try again', {
          variant: 'error',
        })
    } catch (error) {
      console.error(error)
    }
  }

  const renderTable = () => {
    return (
      <TableContainer component={Paper}>
        <Table
          sx={{
            minWidth: 600,
          }}
          size="small"
        >
          <TableHead>
            <TableRow>
              <TableCell>Project Number</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Code</TableCell>
              <TableCell>Date Acquistion</TableCell>
              <TableCell>Dealt Type</TableCell>
              <TableCell>Id group</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Company</TableCell>
              <TableCell>Wgt</TableCell>
              <TableCell>Kw</TableCell>
              <TableCell>Months acquires</TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {projects.map((p: Project, i: number) => (
              <TableRow
                key={p.id_project}
                hover
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell>{p.id_project}</TableCell>
                <TableCell>{p.name}</TableCell>
                <TableCell align="center">{p.code_3}</TableCell>
                <TableCell>
                  {p.acquisition_date
                    ? moment(p.acquisition_date).format('DD/MM/YYYY')
                    : ''}
                </TableCell>
                <TableCell>{p.deal_type}</TableCell>
                <TableCell align="center">{p.id_group}</TableCell>
                <TableCell>{p.status}</TableCell>
                <TableCell>{p.id_company}</TableCell>
                <TableCell>{p.wgt.join(', ')}</TableCell>
                <TableCell align="center">{p.kw}</TableCell>
                <TableCell align="center">
                  {p.months_acquired ? p.months_acquired : '-'}
                </TableCell>
                <TableCell align="center">
                  <IconButton
                    color="info"
                    component="label"
                    onClick={() => {
                      setCurrent((prev) => {
                        return Object.assign({}, prev, current, p)
                      })
                      setShowNewEdit(true)
                    }}
                  >
                    <EditIcon />
                  </IconButton>
                </TableCell>
                <TableCell align="center">
                  <IconButton
                    color="error"
                    component="label"
                    onClick={() => {
                      setOpen(true)
                      setIdSelected(p.id_project)
                    }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    )
  }

  const handleRefresh = () => {
    setShowNewEdit(false)
    getProjects()
    getWgt()
  }

  return (
    <div className={classes.root}>
      <div className={classes.layoutTitle}>
        <Typography variant="h5">List Projects</Typography>
        <Divider />
      </div>
      <div
        className={classes.layoutMain}
        style={{ justifyContent: showNewEdit ? 'center' : 'flex-start' }}
      >
        <div
          className={classes.layoutTable}
          style={{ width: showNewEdit ? '50%' : '100%' }}
        >
          <Button
            variant="contained"
            color="success"
            type="submit"
            onClick={() => {
              setShowNewEdit(true)
              setCurrent(null)
            }}
            sx={{ margin: 2, width: 140 }}
            disabled={showNewEdit}
          >
            New project
          </Button>
          <div style={{ width: '80%', margin: '0 auto' }}>{renderTable()}</div>
        </div>
        {showNewEdit && (
          <NewEditProject
            handleClose={() => setShowNewEdit(false)}
            project={current}
            projects={projects}
            wgts={wgt}
            handleRefresh={handleRefresh}
          />
        )}
      </div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
      >
        <DialogTitle>{`Confirm delete project ${idSelected}`}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure do you want to delete?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setOpen(false)
              deleteProject()
            }}
          >
            Confirm
          </Button>
          <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
export default Projects
