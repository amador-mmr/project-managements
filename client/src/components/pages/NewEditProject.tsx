import {
  Button,
  Checkbox,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import { makeStyles } from '@mui/styles'
import { useEffect, useState } from 'react'
import CancelIcon from '@mui/icons-material/Cancel'
import { Project } from './Projects'
import { DesktopDatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { useSnackbar } from 'notistack'
import axios from 'axios'

const useStyles = makeStyles(() => ({
  root: {
    width: '50%',
    height: '100%',
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  layoutForm: {
    width: '100%',
    height: '100%',
    flex: '1 1 0px',
    overflowY: 'auto',
  },
  form: {
    position: 'relative',
    minWidth: 250,
    maxWidth: 350,
    minHeight: 400,
    margin: '0 auto',
    paddingTop: '40px',
    paddingBottom: '40px',
  },
}))

interface Props {
  handleClose: () => void
  project: Project | null
  projects: Project[]
  wgts: { number: string; idProject: string }[]
}

const NewProject: Project = {
  id_project: '',
  name: '',
  code_3: '',
  acquisition_date: new Date(),
  deal_type: '',
  id_group: '',
  status: '',
  kw: 0,
  months_acquired: 0,
  id_company: '',
  wgt: [],
}

const NewEditProject = (props: Props) => {
  const classes = useStyles()
  const { enqueueSnackbar } = useSnackbar()

  const [project, setProject] = useState<Project>(NewProject)
  const [checkDate, setCheckDate] = useState<boolean>(true)
  const [listWgt, setListWgt] = useState<string[]>([])
  const [wgt, setWgt] = useState<string>('')

  useEffect(() => {
    if (props.project !== null && props.project !== project) {
      setProject((prev) => {
        return Object.assign({}, prev, project, props.project)
      })
      setCheckDate(props.project.acquisition_date === null ? false : true)
    } else if (props.project === null) {
      setProject((prev) => {
        return Object.assign({}, prev, project, NewProject)
      })
    }
  }, [props.project])

  const validate = () => {
    if (
      project.id_project === '' ||
      project.name === '' ||
      project.code_3 === '' ||
      project.deal_type === '' ||
      project.id_group === '' ||
      project.id_company === '' ||
      project.kw === null
    ) {
      enqueueSnackbar('Empty fields', {
        variant: 'error',
        preventDuplicate: true,
      })
      return false
    }
    return true
  }

  const onSubmit = async () => {
    try {
      if (!validate()) return
      const { data } = await axios.post('/api/create-project', project, {
        headers: {
          'Content-type': 'application/json',
        },
      })
      console.log('Result create:', data)
    } catch (error) {
      console.error(error)
    }
  }

  const onEdit = async () => {
    try {
      if (!validate()) return
      const { data } = await axios.put(
        '/api/edit-project/' + project.id_project,
        project,
        {
          headers: {
            'Content-type': 'application/json',
          },
        }
      )
      console.log('Result create:', data)
    } catch (error) {
      console.error(error)
    }
  }

  const handleKeyDown = (event: any) => {
    if (event.key === 'Enter') {
      const index = project.wgt.findIndex((d) => d === event.target.value)
      const index2 = props.wgts.findIndex(
        (d) => d.number === event.target.value
      )
      if (index === -1 && index2 === -1) {
        setListWgt([...listWgt, event.target.value])
        setWgt('')
      } else {
        enqueueSnackbar('WGT already exits', {
          variant: 'error',
          preventDuplicate: true,
        })
      }
    }
  }

  return (
    <div className={classes.root}>
      <IconButton
        color="error"
        component="label"
        sx={{ position: 'absolute', top: 10, right: 10 }}
        onClick={() => props.handleClose()}
      >
        <CancelIcon />
      </IconButton>
      <div className={classes.layoutForm}>
        <Stack
          width="100%"
          alignItems="center"
          spacing={3}
          className={classes.form}
        >
          <Typography variant="h6">
            {props.project === null ? 'New Project' : 'Edit Project'}
          </Typography>
          <TextField
            label="Id Project"
            variant="filled"
            type="text"
            autoFocus
            fullWidth
            value={project?.id_project}
            onChange={(event) => {
              setProject((prev) => ({
                ...prev,
                id_project: event.target.value,
              }))
            }}
          />
          <TextField
            fullWidth
            label="Name project"
            variant="filled"
            type="text"
            value={project?.name}
            onChange={(event) => {
              setProject((prev) => ({ ...prev, name: event.target.value }))
            }}
          />
          <TextField
            fullWidth
            label="Code"
            variant="filled"
            type="text"
            inputProps={{ maxLength: 3 }}
            value={project?.code_3}
            onChange={(event) => {
              setProject((prev) => ({ ...prev, code_3: event.target.value }))
            }}
          />
          <Stack direction="row" alignItems="center">
            <Checkbox
              checked={checkDate}
              onClick={() => setCheckDate(!checkDate)}
            />
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DesktopDatePicker
                label="Acquistion date"
                value={
                  project && project.acquisition_date
                    ? new Date(project.acquisition_date)
                    : new Date()
                }
                disabled={!checkDate}
                onChange={(date) => {
                  debugger
                  setProject((prev) => ({
                    ...prev,
                    acquisition_date: date === null ? undefined : date,
                  }))
                }}
              />
            </LocalizationProvider>
          </Stack>
          <TextField
            fullWidth
            label="Deal Type"
            variant="filled"
            type="text"
            value={project?.deal_type}
            onChange={(event) => {
              setProject((prev) => ({ ...prev, deal_type: event.target.value }))
            }}
          />
          <TextField
            fullWidth
            label="Id group"
            variant="filled"
            type="text"
            value={project?.id_group}
            onChange={(event) => {
              setProject((prev) => ({ ...prev, id_group: event.target.value }))
            }}
          />
          <TextField
            fullWidth
            label="Status"
            variant="filled"
            type="text"
            value={project?.status}
            onChange={(event) => {
              setProject((prev) => ({ ...prev, status: event.target.value }))
            }}
          />
          <TextField
            fullWidth
            label="Company"
            variant="filled"
            type="number"
            value={project?.id_company}
            onChange={(event) => {
              setProject((prev) => ({
                ...prev,
                id_company: event.target.value,
              }))
            }}
          />
          <div>
            <TextField
              label="Wgt"
              type="text"
              value={wgt}
              onChange={(e) => setWgt(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <List
              dense
              sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
            >
              {project.wgt.map((value: string) => {
                return (
                  <ListItem
                    key={value}
                    secondaryAction={
                      <Checkbox
                        edge="end"
                        onChange={() =>
                          setProject({
                            ...project,
                            wgt: project.wgt.filter((l) => l !== value),
                          })
                        }
                        checked={true}
                      />
                    }
                    disablePadding
                  >
                    <ListItemButton>
                      <ListItemText primary={value} />
                    </ListItemButton>
                  </ListItem>
                )
              })}
            </List>
          </div>
          <TextField
            fullWidth
            label="Kw"
            variant="filled"
            type="number"
            value={project?.kw}
            onChange={(event) => {
              setProject((prev) => ({
                ...prev,
                kw: parseInt(event.target.value),
              }))
            }}
          />
          <TextField
            fullWidth
            label="Months acquires"
            variant="filled"
            type="number"
            value={
              project && project.months_acquired ? project.months_acquired : ''
            }
            onChange={(event) => {
              setProject((prev) => ({
                ...prev,
                months_acquired: parseInt(event.target.value),
              }))
            }}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={() => (props.project === null ? onSubmit() : onEdit())}
          >
            {props.project === null ? 'Add new project' : 'Update project'}
          </Button>
        </Stack>
      </div>
    </div>
  )
}
export default NewEditProject
